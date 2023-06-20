import usersModel from "./users-model.js";

export function findAllUsers() {
    return usersModel.find();
}

export function findUserByUsername(username) {
    return usersModel.findOne({username: username});
}

export const findUserByCredentials = (username, password) => {
    return usersModel.findOne({username, password});
}

export const findUserById = (userId) => {
    return usersModel.findOne({_id: userId});
}

export const createUser = (user) => {
    return usersModel.create(user);
}

export const updateUser = (id, user) => {
    return usersModel.updateOne({_id: id}, {$set: user});
}

export const deleteUser = (id) => {
    return usersModel.deletOne({_id: id});
}

//export const findAllUsers = () => users;

// export const findUserById = (uid) => {
//  const index = users.findIndex((u) => u._id === uid);
//  if (index !== -1) return users[index];
//  return null;
// };


//export const findUserByUsername = (username) => {
 //const index = users.findIndex((u) => u.username === username);
 //if (index !== -1) return users[index];
 //return null;
//};


//export const findUserByCredentials = (username, password) => {
 //const index = users.findIndex((u) => u.username === username && u.password === password);
 //if (index !== -1) return users[index];
 //return null;
//};


// export const createUser = (user) => { 
//     users.push(user);
//     return user;
// }


// export const updateUser = (uid, user) => {
//  const index = users.findIndex((u) => u._id === uid);
//  users[index] = { ...users[index], ...user };
//  return users[index];
// };


// export const deleteUser = (uid) => {
//  const index = users.findIndex((u) => u._id === uid);
//  users.splice(index, 1);
//  return {status: 'ok'}
// };
