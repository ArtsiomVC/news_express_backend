import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import rootRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(rootRouter);

(async function(){
  try {
    await connect(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log('Sever was started');
    });
  } catch (err) {
    console.log(err);
  }
})();
