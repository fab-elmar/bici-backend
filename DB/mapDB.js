import mongoose from "mongoose"

/* const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}); */

const MapSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            path: ""
        },
        camping: { type: Boolean, default: false },
        description: { type: String },
        location: {
            type: { type: String },
            coordinates: []
        },
        events: { type: Boolean, default: false },
        host: { type: Boolean, default: false },
        repair: { type: Boolean, default: false },
        shower: { type: Boolean, default: false },
        swim: { type: Boolean, default: false },
        pin_imgs: [{
            aws_url: { type: String },
            aws_name: { type: String }
        }]
    },
    { timestamps: true }
)

MapSchema.pre("find", function () {
    this.populate("user")
})

MapSchema.index({ location: "2dsphere" });

<<<<<<< HEAD
const SetPin = mongoose.model("mapPin", MapSchema);
=======
const Mappin = mongoose.model("mappin", MapSchema);
>>>>>>> 41aa54829eadcd16de83301a025cd333ef7cdfb8

export default Mappin


// var message = new SetPin({
//     user: "637c95291571bfe764f98ca4",
//     location: {
//         type: "Point",
//         coordinates: [51.098948, 16.110492]
//     },
// });
// message.save((err, message) => {
//     if (err) console.log(err);
//     console.log(message);
// });


// SetPin.find({
//     location: {
//         $near: {
//             $maxDistance: 100000,
//             $geometry: {
//                 type: "Point",
//                 coordinates: [52, 16]
//             }
//         }
//     }
// }).find((error, results) => {
//     if (error) console.log(error);
//     console.log(JSON.stringify(results, 0, 2));
// });

/* 
SetPin.find({
    location: {
        $geoWithin: {
            $box: [
                [52 - 10, 16 - 10],
                [52 + 10, 16 + 10],
            ]
        }
    }
}).find((error, results) => {
    if (error) console.log(error);
    console.log(JSON.stringify(results, 0, 2));
});
 */