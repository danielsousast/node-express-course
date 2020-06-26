import User from '../models/User';
import { emailExists } from '../services/UserService';

class UserController {
    async index(req, res) {
        const user = await User.findById(req.user)

        if(!user) {
            return res.status(401)
            .json({error:"Only authenticated users can execute this action"})
        }

        return res.json({user:user.show()})
    }

    async store(req, res) {
        const {name, email, password} = req.body;

        if(await emailExists(email)) {
            return res.status(400).json({error:'Email already exists'})
        }

        const user = await User.create({
            name, email, password
        });

        return res.json(user.show());
    }

    async update(req, res) {
        const {name, email, password} = req.body;

        const user = await User.findById(req.user);

        if(!user) {
            return res.status(401)
            .json({error:"Only authenticated users can execute this action"})
        }

        if(email && (email !== user.email)) {
            if(await emailExists(email)) {
                return res.status(400).json({error:'Email already exists'})
            }
        }

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = password;

        await user.save()

        return res.json({user:user.show()});
    }

    async delete(req, res) {
        const user = await User.findById(req.user);

        if(!user) {
            return res.status(401)
            .json({error:"Only authenticated users can execute this action"})
        }

        user.deleted = true;
        await user.save()

        return res.status(204).send();
    }
}

export default new UserController();