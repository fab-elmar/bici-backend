import mongoose from "mongoose"

const CommentsSchema = new mongoose.Schema(
    {
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userprofile: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserProfile"
        },
        comment: {
            required: true,
            type: String
        },
        pin_id: {
            required: true,
            type: String
        }
    },
    { timestamps: true }
)

CommentsSchema.pre("find", function () {
    this.populate("userprofile")
    // this.populate("userprofile")
})

const Comment = mongoose.model("Comment", CommentsSchema)

export default Comment