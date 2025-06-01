import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {rateLimit} from 'express-rate-limit'
import {checkConnection} from './configs/Database.js'
import createAllTables from './utils/CreateTable.js'
import dotenv from 'dotenv'

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

app.listen(PORT, () => {
    console.log("Listening on PORT:", PORT);
    checkConnection();
    createAllTables();
})