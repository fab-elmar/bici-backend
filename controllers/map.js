import SetPin from "../DB/mapDB.js";
import * as jwt from "../utilities/jwt.js";
import mongoose from "mongoose";
import { transform, geoToArr } from "./utils.js";

export const editMapPin = async (req, res) => {
  if (!req.token.id) {
    return res.status(404).send({
      message: "Map >You're not logged in ",
      success: false,
      data: null,
    });
  }
  try {
    console.log("location", req.body.location);
    const userId = mongoose.Types.ObjectId(req.token.id);
    const coordinates = [
      parseFloat(transform(req.body.location)[0]),
      parseFloat(transform(req.body.location)[1]),
    ];

    let foundPin = await SetPin.findOne({
      location: {
        coordinates: coordinates,
      },
    });
    if (!foundPin) {
      await SetPin.create({
        user: userId,
        camping: req.body.camping,
        title: req.body.title,
        description: req.body.description,
        location: {
          type: "Point",
          coordinates: coordinates,
        },
        events: req.body.events,
        host: req.body.host,
        repair: req.body.repair,
        shower: req.body.shower,
        swim: req.body.swim,
        pin_imgs: req.files.map((e) => ({
          aws_url: e.location,
          aws_name: e.key,
        })),
        // pin_imgs: [
        //     req.files.map((img) =>  {
        //         console.log("IMMMMMMMAAAG", img);
        //         return {aws_url: ${img.location},
        //     aws_name: ${img.key}}
        //     })]
      });
    } else {
      foundPin.updateOne(req.body, { new: true }, (err, data) => {
        if (err) return console.log(err);
        console.log(data);
      });
    }

    res.send({
      message: "Pin successfully set or updated",
      data: foundPin,
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
};

export const getPins = async (req, res) => {
  console.log("GET PINS BODY", req.body);
  console.log(Math.random());
  const northEastArr = geoToArr(req.body.bou._northEast);
  const southWestArr = geoToArr(req.body.bou._southWest);
  console.log("North", northEastArr, "South", southWestArr);
  SetPin.find(
    {
      location: {
        $geoWithin: {
          $box: [northEastArr, southWestArr],
        },
      },
    },
    (error, results) => {
      if (error) console.log(error);
      res.json(results);
    }
  );
};
