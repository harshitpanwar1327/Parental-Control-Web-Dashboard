import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {rateLimit} from 'express-rate-limit'
import AuthMiddleware from './middlewares/AuthMiddleware.js'
import {checkConnection} from './configs/Database.js'
import createAllTables from './utils/CreateTable.js'
import sendEmail from './mailer/SendMail.js'
import UsersRoutes from './routes/UsersRoutes.js'
import ChildrenRoutes from './routes/ChildrenRoutes.js'
import DevicesRoutes from './routes/DevicesRoutes.js'
import ActivitiesRoutes from './routes/ActivitiesRoutes.js'
import ControlsRoutes from './routes/ControlsRoutes.js'
import SettingsRoutes from './routes/SettingsRoutes.js'
import ReportIssueRoutes from './routes/ReportIssueRoutes.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/uploads/profiles', express.static(path.join(dirName, 'uploads/profiles'), {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 1000,
})
app.use(limiter);

app.use('/api/users', UsersRoutes);

app.use('/api/devices', DevicesRoutes);

app.use(AuthMiddleware);

app.use('/api/children', ChildrenRoutes);

app.use('/api/activities', ActivitiesRoutes);

app.use('/api/controls', ControlsRoutes);

app.use('/api/settings', SettingsRoutes);

app.use('/api/report-issue', ReportIssueRoutes);

app.post('/api/sendEmail', sendEmail);

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
        console.log("Something went wrong!", error);
    }
})