import mongoose from "mongoose";
import Comment from "../DB/comment.js";

import UserProfile from "../DB/userProfile.js";

async function getPinComments(request, response) {
  console.log("PINID in GET Comments", request.body.pinId);
  if (request.body.pinId) {
    try {
      const pinComments = await Comment.find({
        pin_id: request.body.pinId,
      });
      console.log("pinComments", pinComments);
      return response.send({
        message: "comments found for pin",
        success: true,
        data: pinComments,
      });
    } catch (error) {
      return response.send({
        message: "Sorry we could not find the comments",
        success: false,
      });
    }
  }
}

async function createComment(request, response) {
  console.log("comment", request.body);
  const userId = mongoose.Types.ObjectId(request.token.id);
  const userProfile = await UserProfile.find({
    user: request.token.id,
  });
  console.log("userProfile", userProfile);
  // console.log("userID", userId)
  try {
    const newComment = await Comment.create({
      user: request.token.id,
      userprofile: userProfile[0]._id,
      comment: request.body.comment,
      pin_id: request.body.pin_id,
    });
    return response.send({
      message: "commenting succesful",
      success: true,
      data: newComment,
    });
  } catch (error) {
    return response.send({
      message: "commenting failed",
      success: false,
      data: error,
    });
  }
}

const CommentController = {
  getPinComments,
  createComment,
};

export default CommentController;
