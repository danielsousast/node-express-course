import User from "../models/User"

export async function emailExists(email) {
    const user = await User.findOne({email})

    return user
}
