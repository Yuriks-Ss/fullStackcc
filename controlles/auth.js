const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');
const keys = require('../config/keys')
const errorHandler = require('../unils/errorHandler')



module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //check pasword , candidate already use
        const passwordresult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordresult) {
            //generated token, password fit
            const token =jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60}) //time live token 1 hours

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            //password don`t fit
            res.status(401).json({
                message: 'password don`t fit, try again'
            })

        }
    } else {
        // candidate null ,error
        res.status(404).json({
            message: 'user with this email not found'
        })
    }

};


module.exports.register = async function (req, res) {
   //email password
    const candidate = await User.findOne({email: req.body.email})

    if (candidate){
        //candidate already register ,error
        res.status(409).json({
            message: 'Email is already used,try another one'
        })

    }else {
        //create candidate
        const salt = bcrypt.genSaltSync(11) //hashing
        const password = req.body.password
        const user = new User({
            email:req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            //check error
            errorHandler(res, e)

        }

    }
};
