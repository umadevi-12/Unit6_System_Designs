import mongoose from 'mongoose';
import { describe } from 'node:test';
import Column from '../../client/src/components/Column';

const taskSchema = new mongoose.Schema({
    title:String ,
    description:String ,
    assignedTo:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    dueDate:Date,
    column:String,
    boardId:{type:mongoose.Schema.Types.ObjectId , ref:'Board'}

})

export default mongoose.model('Task', taskSchema);