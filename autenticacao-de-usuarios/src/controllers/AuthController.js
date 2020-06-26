import User from '../models/User'
import {compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'

class AuthController {
    async store(req, res) {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.json({error:'Credentials do not match'});
        }
        if(user.deleted) {
            return res.json({error:'Disabled user'});
        }

        const checkPassword = await compare(password, user.password);
        
        if(!checkPassword) {
            return res.json({error:'Credentials do not match'});
        }

        const token = jwt.sign({}, 'sdkpojdopjopasdsad', {
            subject:String(user._id),
             expiresIn:'5d'
        })

        return res.json({user:user.show(), token})
    }
}

export default new AuthController();