import express from 'express';
import connectDB from './db/connectdbb';
import { APP_PORT, DATABASE_URL } from './Config';
import errorHandler from './middlewares/errorHandler';
import routers from './routes';
const app = express();

app.use(express.json());
app.use('/api', routers);

// Database Connection
connectDB(DATABASE_URL);

app.use(errorHandler);
app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
