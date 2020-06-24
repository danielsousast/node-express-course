import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category'
    }
}, {
    timestamps:true
});

export default model('Product', ProductSchema)