import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import accountRoutes from './routes/accountRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
