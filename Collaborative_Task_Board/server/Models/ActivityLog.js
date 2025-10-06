import { timeStamp } from 'console';
import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    action:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    boardId:{type:mongoose.Schema.Types.ObjectId , ref:"Board"},
    timeStamp:{type:Date , default:Date.now}
})

export default mongoose.model('ActivityLog', activityLogSchema);