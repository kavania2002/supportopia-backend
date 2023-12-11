const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Support = require('../models/support.model');
const {upload} = require('../utils/s3.utils');
const jwtSevices = require('../utils/jwt.utils')
const {ObjectId} = require('mongodb');
const e = require('express');

const addSuppoter = async (req) => {
    const {supportedTo,name, message,number} = req.body;
    const supportedBy = req.user.id;

    function addMonthsToDate(currentDate, monthsToAdd) {
        var newDate = new Date(currentDate);        
        newDate.setMonth(newDate.getMonth() + monthsToAdd);
        return newDate;
      }

    const newSupporter = new Support({
        supportedTo,
        supportedBy,
        name,
        message,
        number
    })

    let supporterTran =  await newSupporter.save().then((supporterTran,err) => {
            if (err) {
                throw "server error"
            }
            return supporterTran;
        })
        

    let user = await User.findOne({_id:supportedTo});
    let check = false;
    let currentDate = new Date();
    for(let i=0; i<user.supporters.length; i++){
        if(user.supporters[i].userId == supportedBy){
            check = true;
            currentDate = user.supporters[i].expiry;

            // change the expiry
            user.supporters[i].expiry = addMonthsToDate(currentDate, number);
            break;
        }
    } 
    if(check == false){
        user.supporters.push({
            "userId" : supportedBy,
            "expiry": addMonthsToDate(currentDate, number)
        })
        
        user.mySupports.push(supporterTran._id);
        await user.save();

        const supportedUser = await User.findById(supportedBy); 
        supportedUser.supportedTo.push(supportedTo);

        await supportedUser.save();

    }
    else
    {
        user.mySupports.push(supporterTran._id);
        await user.save();
    }
    return {
        data: {
            support: supporterTran 
        },
        message: 'Supported'
    }
}


module.exports = {addSuppoter};