import usersSchema from "./users-schema.js";
import mongoose from "mongoose";

const usersModel = mongoose.model("users", usersSchema);
export default usersModel;
