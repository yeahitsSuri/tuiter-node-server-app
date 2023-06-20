import people from './users.js';
import mongoose from "mongoose";
import * as usersDao from "./users-dao.js";

mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

let users = people

const updateUser = async (req, res) => {
  const userId = req.params.uid;
  const status = await usersDao.updateUser(userId, req.body);
  const user = await usersDao.findUserById(userId);
  req.session["currentUser"] = user;
  res.json(status);
  // const updates = req.body;
  // users = users.map((usr) =>
  //   usr._id === userId ?
  //     {...usr, ...updates} :
  //     usr
  // );
  // res.sendStatus(200);
}

const deleteUser = async (req, res) => {
  const userId = req.params.uid;
  const status = await usersDao.deleteUser(userId);
  //users = users.filter(usr => usr._id !== userId);
  res.json(status);
}

const createUser = async (req, res) => {
  const newUser = await usersDao.createUser(req.body);
  // const newUser = req.body;
  // newUser._id = (new Date()).getTime() + '';
  // users.push(newUser);
  res.json(newUser);
}

const findUserById = async (req, res) => {
  const userId = req.params.uid;
  // const user = users
  //   .find(u => u._id === userId);
  const user = await usersDao.findUserById(userId);
  res.json(user);
}

const findUsers = async (req, res) => {
  console.log("find user ing");
  const username = req.query.username;
  const password = req.query.password;
  if(username && password) {
    // const user = users.find(
    //   (user) => user.username === username && user.password === password
    // );
    const user= await usersDao.findUserByCredentials(username, password);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else if (username) {
    //const user = user.find((user)=>user.username === username);
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } else {
    //setTimeout(() => {
    //res.sendStatus(404);
    const users = await usersDao.findAllUsers();
    res.json(users);
    //}, 2000)
  }
}

const UserController = (app) => {
  app.get('/api/users', findUsers);
  app.get('/api/users/:uid', findUserById);
  app.post('/api/users', createUser);
  app.delete('/api/users/:uid', deleteUser);
  app.put('/api/users/:uid', updateUser);
}

export default UserController