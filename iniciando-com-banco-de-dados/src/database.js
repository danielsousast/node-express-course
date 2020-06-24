import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init()
    }

    init(){
        mongoose.connect('mongodb://localhost:27017/apidb', {
            useNewUrlParser:true, useUnifiedTopology:true
        }, () => {
            console.log('MongoDB Connected')
        });
    }
}

export default new Database();