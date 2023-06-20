import * as usersDao from "./users-dao.js";

var currentUserStatus;
const AuthController = (app) => {

  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      console.log("this user is already existed!");
      return;
    }
    console.log("build new user ing!");
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
    // const username = req.body.username;
    // const user = usersDao.findUserByUsername(username);
    // if (user) {
    //   console.log("this user is already existed!");
    //   res.sendStatus(409);
    //   return;
    // }
    // const userGet = req.body;
    // userGet._id = (new Date()).getTime() + '';
    // const newUser = usersDao.createUser(userGet);
    // currentUserStatus = newUser;
    // //req.session["currentUser"] = newUser;
    // res.json(newUser);
  };

 const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
    // const username = req.body.username;
    // const password = req.body.password;
    // const user = usersDao.findUserByCredentials(username, password);
    // if (user) {
    //   currentUserStatus = user;
    //   res.json(user);
    // } else {
    //   res.sendStatus(404);
    // }
    // return;
  };
 
  const profile = async (req, res) => {
    const currentUser = req.session.currentUser;
    console.log("Current User is:" + currentUser._id);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };
 
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
 
 const update = async (req, res) => {
    const currentUser = currentUserStatus;
    //const uid = req.params.uid;
    //const user = usersDao.findUserById(uid);
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    const update = req.body;
    const id = currentUser._id;
    const userAfterUpd = usersDao.updateUser(id, update);
    if (userAfterUpd) {
      currentUserStatus = userAfterUpd;
      res.json(userAfterUpd);
    } else {
      res.sendStatus(404);
    }
  };

 app.post("/api/users/register", register);
 app.post("/api/users/login",    login);
 app.post("/api/users/profile",  profile);
 app.post("/api/users/logout",   logout);
 app.put ("/api/users",          update);
};
export default AuthController;