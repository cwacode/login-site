import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import projectRouter from './routes/projectRouter.js';
import eventRouter from './routes/eventRouter.js';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://login-site-14vx.onrender.com']

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json());
app.use(express.static('dist')); 

app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('api/events', eventRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});





