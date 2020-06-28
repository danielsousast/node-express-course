import crypto from 'crypto';
import {addMinutes, isBefore, isAfter} from "date-fns"
import Mail from "../helpers/Mail";
import mail from "../config/mail";
import User from "../models/User";

class RecoveryController {
    async store(req, res) {
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({error:'User does not found'});
        }

        const token = await crypto.randomBytes(8).toString('hex');
        const exp = addMinutes(new Date(), 5);

        console.log(token)

        user.token = token;
        user.expiration = exp;

        await user.save()

        Mail.sendMail({
            from:mail.from,
            to:'tst@email.com',
            subject:"Test",   
            template:'recovery',     
            context:{
                token:user.token
            }
        })

        return res.status(200).send();
    }

    async update(req, res) {
        const {password, token} = req.body;

        const user = await User.findOne({token});

        if(!user) {
            return res.status(400).json({error:'Invalid token'});
        }

        if(isAfter(new Date(), user.expiration)) {
            return res.status(400).json({error:'Token exipred'});
        }

        user.password = password;
        user.token = null;
        user.expiration = null;

        await user.save();

        return res.status(200).send();
    }
}

export default new RecoveryController();