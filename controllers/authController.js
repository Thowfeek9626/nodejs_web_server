const usersDB = {
    users : require('../model/users.json'),
    setUsers : (data) =>{
        this.users = data;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req,res)=>{
    const {user,pwd}= req.body;
    console.log(user,pwd)
    if(!user || !pwd){
        return res.status(400).json({'message':'Username and password are required'});
    }
    const foundUser = usersDB.users.find(person =>{
       return person.username === user;
    })
    console.log(usersDB,"usersDB.users");
    console.log(foundUser);
    if(!foundUser){
        return res.sendStatus(401); //unauthorized
    }
    // evaluate the password
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        res.json({'success':`User ${user} is logged in successfully!`});
    }else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};