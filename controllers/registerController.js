const User = require('../model/User')
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res)=>{
    const{user, pwd} = req.body;
    console.log(user, pwd , req.body);
    if(!user || !pwd){
        return res.status(400).json({'message':'Username and password are required'});
    }
    // check for duplicate usernames in the database
    const duplicate = User.findOne({username: user}).exec;
    if(duplicate){
        return res.sendStatus(409);
    }
    try{
        //encrypt the pwd
        hashedPwd = await bcrypt.hash(pwd,10);
        //store the new user
        const result = await User.create({
            "username" : user,
            "password" : hashedPwd
        });
        console.log(result);
        res.status(201).json({'success':`New user ${user} created!`})
    }catch(err){
        res.status(500).json({'message' : err.message});
        // console.log(err.message);
    }
}

module.exports = {handleNewUser}