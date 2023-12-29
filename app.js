const express=require('express')
const morgan=require('morgan')
const app=express()
const connectDB=require('./db/connect')
require('dotenv').config()
require('express-async-errors')

const notFoundMiddleware=require('./middleware/not-found');
const errorHandlerMiddleware=require('./middleware/error-handler')

const cookieParser=require('cookie-parser')

const authRouter=require('./routes/authRoutes')
const userRouter=require('./routes/userRoutes')
const productRouter=require('./routes/productRoutes')

const { authenticateUser } = require('./middleware/authentication')

const PORT=process.env.PORT || 5000


app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/users',authenticateUser,userRouter)
app.use('/products',productRouter)

app.get('/',(req,res)=>{
    res.send("Welcome to the ecom API")
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()