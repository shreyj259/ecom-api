const moongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')

const UserSchema=new moongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please provide email'],
        validate:{
            message:'Please provide valid email',
            validator:validator.isEmail,
        }
    },
    password:{
        type:String,
        required:[true,'Please provide name'],
        minlength:6
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
})

UserSchema.pre('save',async function(){
    const salt=await bcryptjs.genSalt(10);
    this.password=await bcryptjs.hash(this.password,salt);
})

UserSchema.methods.comparePassword=async function(pass){
    const isMatch=await bcryptjs.compare(pass,this.password)
    return isMatch;
}



module.exports=moongoose.model('User',UserSchema)