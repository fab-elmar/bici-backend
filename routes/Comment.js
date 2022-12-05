import express from "express"
import CommentController from "../controllers/Comment.js"

const router = express.Router()



const {
    getAllComments,
    createComment,
    //  deleteComment,
} = CommentController

router.route("/").post(createComment)
router.route("/get").post(getAllComments)
//router.route("/:id").delete(deleteComment)

export default router