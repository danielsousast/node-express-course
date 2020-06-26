import { verify } from "jsonwebtoken";
import User from "../models/User";

export default async function(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error:'Token is missing'});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await verify(token, 'sdkpojdopjopasdsad');

        const id = decoded.sub;

        const user = await User.findById(id);

        if(user.deleted) {
            return res.status(401).json({error:'Disabled user'});
        }

        req.user = id;
        return next()

    } catch (error) {
        return res.status(401).json({error:error.message});
    }
}