import moongoose from 'moongoose';

const userSchema = new moongoose.Schema({
    name:String,
    email:{type:String , unique:true},
    password:String,
    role:{type:String , enum:["admin" , "member"], default:"Member"}
})

export default moongoose.model('User', userSchema);