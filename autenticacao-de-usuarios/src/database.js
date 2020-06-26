import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init()
    }

    init() {
        mongoose.connect(
            "mongodb://localhost:27017/usersapi",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            }
        );
    }
}

export default new Database();