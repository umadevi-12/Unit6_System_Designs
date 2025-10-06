import { create } from 'domain';
import moongoose from 'moongoose';
import { title } from 'process';

const columnSchema = new moongoose.Schema({
    title:String ,
    tasks:[{type:moongoose.Schema.Types.ObjectId ,ref:"Task"}]
})

const boardSchema = new moongoose.Schema({
    title:String ,
    columns:[columnSchema],
    members:[{type:moongoose.Schema.Types.ObjectId,ref:"User"}],
    createdBy:{type:moongoose.Schema.Types.ObjectId,ref:"User"},
})

export default moongoose.model('Board', boardSchema);