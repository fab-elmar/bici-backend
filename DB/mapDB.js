import mongoose from "mongoose";

const MapSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      path: "",
    },
    title: { type: String, default: "This pin needs a title" },
    // rating: {
    //   required: true,
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Rating",
    //   path: "",
    // },
    camping: { type: Boolean, default: false },
    description: { type: String },
    location: {
      type: { type: String },
      coordinates: [],
    },
    events: { type: Boolean, default: false },
    host: { type: Boolean, default: false },
    repair: { type: Boolean, default: false },
    shower: { type: Boolean, default: false },
    swim: { type: Boolean, default: false },
    pin_imgs: [
      {
        aws_url: { type: String, default: "https://biciappimages.s3.eu-central-1.amazonaws.com/pin_images/Placeholder_view_vector.svg.png" },
        aws_name: { type: String },
      },
    ],
  },
  { timestamps: true }
);

MapSchema.pre("find", function () {
  this.populate("user");
  // this.populate("rating");
});

MapSchema.index({ location: "2dsphere" });

const SetPin = mongoose.model("mappin", MapSchema);

export default SetPin;
