import { Schema, model } from 'mongoose'
const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const adminModel  = model('Admin' , adminSchema)
export default adminModel

