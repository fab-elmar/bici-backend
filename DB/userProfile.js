import mongoose from "mongoose"


const ProfileSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        nickname: { type: String },
        address: { type: String },
        location: { type: String },
        description: { type: String },
        bikeType: { type: String },
        cell: { type: String },
        birthday: { type: Date },
        privacy: { type: Boolean, default: true },
        role: { type: String, default: "User" },
        avatar_img: {
            aws_url: { type: String, default: "https://biciappimages.s3.eu-central-1.amazonaws.com/avatar_images/Portrait_Placeholder.png" },
            aws_name: { type: String }
        }
    },
    { timestamps: true }
)

ProfileSchema.pre("find", function () {
    this.populate("user")
})

const UserProfile = mongoose.model("UserProfile", ProfileSchema);

export default UserProfile