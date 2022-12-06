import mongoose from "mongoose"
import SetPin from "../DB/mapDB.js"



export const getProPin = async (req, res) => {

    if (req.token?.id) {
        try {
            console.log('hallo', req.token.id)
            const userId = mongoose.Types.ObjectId(req.token.id);
            console.log("USERID", userId)
            const pins = await SetPin.find({ user: userId })

            if (!pins) {
                res.status(404).send({
                    message: "getProPin > User not found",
                    success: false,
                    data: pins,
                })
            } else {
                res.status(200).send({
                    message: "getProPin> User found",
                    success: true,
                    data: pins,
                })
            }
        } catch (error) {
            res.status(400).send({
                message: error.message,
                success: false,
                data: error,
            })
        }
    } else {
        res.status(401).send({
            message: "UserProfile> You are not logged in",
            success: false,
        })
    }
}
