import express from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/userRoutes.js';
import productRouter from './routes/productRouter.js';
import cors from 'cors';
//----------------------------------------------------

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//----------------------------------------------------

// CORS Configuration

const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true); // chenge this as false after compleating testing , no need of brouser accessing my application data
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

//----------------------------------------------------

// Middleware to parse json bodies
app.use(express.json());

//----------------------------------------------------

//root route
app.get('/api', (req, res) => {
    res.send('i am ready to enable api access for you. your domain is whitelisted.');
});

//----------------------------------------------------

// user router
app.use("/api/users", UserRouter);

//----------------------------------------------------

// Product Router
app.use('/api/products', productRouter);












//----------------------------------------------------
// Start the server
app.use('/{*splat}',(req,res,next)=>{
    
    res.status(404).send({message:"The requested resource was not found on this server."});
    next();
    
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});