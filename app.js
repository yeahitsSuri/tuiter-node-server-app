import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuisController from './controllers/tuits/tuis-controller.js';
import cors from 'cors'
import session from 'express-session'
import AuthController from "./users/auth-controller.js";

const app = express();
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
}))
app.use(express.json());
const port = process.env.PORT || 4000;
AuthController(app);
TuisController(app);
HelloController(app);
UserController(app);
app.listen(process.env.PORT || 4000);