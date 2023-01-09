import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/task.routes'
const app = express();

app.use(express.json());

//middlewares
const corsOptions = {};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to task-api' });
});

app.use('/api/tasks', tasksRoutes);



export default app;
