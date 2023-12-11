const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Support = require('../models/support.model');
const {upload} = require('../utils/s3.utils');
const jwtSevices = require('../utils/jwt.utils')
const {ObjectId} = require('mongodb');
const e = require('express');

const addSuppoter = async (data) => {
    const {supportedTo, supportedBy,name, message,number} = data;
    console.log(data);
    console.log(supportedTo, supportedBy,name, message,number);
    console.log(11);

    const newSupporter = new Support({
        supportedTo,
        supportedBy,
        name,
        message,
        number
    })

    let supporterTran =  await newSupporter.save().then((supporterTran,err) => {
            console.log(err,supporterTran)
            if (err) {
                throw "server error"
            }
            console.log(supporterTran);
            return supporterTran;
        })
        
    console.log(supporterTran);
 

    let user = await User.findOne({_id:supportedTo});
    console.log(user);
    let check = false;
    for(let i=0; i<user.supporters.length; i++){
        if(user.supporters[i].supportedBy == supportedBy){
            check = true;
            break;
        }
    } 
    console.log("start");
    console.log(check);
    if(check == false){
        user.supporters.push({
            supportedBy
        })
        
        user.mySupports.push({"transition":supporterTran._id});
        await user.save();

        const supportedUser = await User.findById(supportedBy); 
        supportedUser.supportedenvTo.push({"supportedTo" : supporterTran._id});
        console.log(supportedUser);

        await supportedUser.save();

    }
    else
    {
        user.mySupports.push({"transition":supporterTran._id});
        await user.save();
    }
    return {
        data: {
            supportObject:supporterTran 
        },
        message: 'Supported'
    }
}


module.exports = {addSuppoter};