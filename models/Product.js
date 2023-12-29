const moongoose=require('mongoose')

const ProductSchema=new moongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Please provide a product name'],
        maxlength:[100,'Name can not be more than 100 characters']
    },
    price:{
        type:Number,
        required:[true,'Please provide a product price'],
        default:0
    },
    description:{
        type:String,
        required:[true,'Please provide a product description'],
        maxlength:[1000,'Description can not be more than 1000 characters']
    },
    image:{
        type:String,
        default:'/uploads/example.jpeg'
    },
    category:{
        type:String,
        required:[true,'Please provide a product category'],
        enum:['office','kitchen','bedroom']
    },
    company:{
        type:String,
        required:[true,'Please provide a product company'],
        enum:{
            values:['ikea','liddy','marcos'],
            message:'{VALUE} is not supported'
        },
    },
    colors:{
        type:[String],
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    inventory:{
        type:Number,
        required:true,
        default:15
    },
    averageRating:{
        type:Number,
        default:0
    },
    user:{
        type:moongoose.Types.ObjectId,
        ref:'User',
        required:true,
    }    
},
{timestamps:true,}
)



module.exports=moongoose.model('Product',ProductSchema)