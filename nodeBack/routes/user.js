
const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/signup',(req,res) => {

    let user = req.body;
    query = "select user_name,password,role from user where user_name=?"
    connection.query(query,[user.user_name],(err,results) => { if(!err){
        if(results.length <=0){
            query = "insert into user(user_name,password,role) values (?,?,'user')";
            connection.query(query,[user.user_name,user.password],(err,results) => {
                if(!err){ return res.status(200).json({message:"Successfully Registrovani"});
                }else{
                    return res.status(500).json(err);
                }
            })
        }else{
            return res.status(400).json({message:"User Name alredy exists"});
        }
    }else{ 
        return res.status(500).json(err);
    }
    })

})


router.post('/login',(req,res) => {
    const user = req.body;
    query = "select user_name,password,role  from user where user_name=?";
    connection.query(query,[user.user_name.trim()],(err,results) => {
        if(!err){
            if(results.length <=0 || results[0].password != user.password){
                return res.status(401).json({message:"Netacan Username ili Password"});
            }
            else if (results[0].status === 'false'){
                return res.status(401).json({message:"Wait for Admin Approval"});
            }
            else if (results[0].password == user.password){

                const response = { user_name:results[0].user_name,role:results[0].role}
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn:'8h'})
                res.status(200).json({token:accessToken});

            }else{
                return res.status(400).json({message:"Something went wrong.Please try again later"})
            }
        }else{
            return res.status(500).json(err);
        }
    })
})


module.exports = router;