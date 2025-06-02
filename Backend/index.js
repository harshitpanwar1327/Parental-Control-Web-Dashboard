import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {rateLimit} from 'express-rate-limit'
import {checkConnection} from './configs/Database.js'
import createAllTables from './utils/CreateTable.js'
import UsersRoutes from './routes/UsersRoutes.js'
import AuthMiddleware from './middlewares/AuthMiddleware.js'

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
})
app.use(limiter)

app.use('/api/users', UsersRoutes);

app.use(AuthMiddleware);

app.use((req, res, next) => {
    res.status(404).json({message: "Page not found!"})
})

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).json({message: "Internal Server Error!"});
})

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
    try {
        checkConnection();
        createAllTables();
    } catch (error) {
        console.log("Something went wrong! ", error);
    }
})