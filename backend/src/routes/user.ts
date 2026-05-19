import { Router } from "express";
import { register } from "../controllers/user/register";
import { login } from "../controllers/user/login";
const userrouter = Router();
//user route
userrouter.post("/signup", register);
userrouter.post("/login", login);


export default userrouter;