import mongoose from "mongoose"

const CommentsSchema = new mongoose.Schema(
    {


        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: { required: true, type: String },
        pinId: { required: true, type: mongoose.Schema.Types.ObjectId, ref: "SetPin" },


    },
    { timestamps: true }
)

CommentsSchema.pre("find", function () {
    this.populate("user")
})

const Comment = mongoose.model("Comment", CommentsSchema)

export default Comment