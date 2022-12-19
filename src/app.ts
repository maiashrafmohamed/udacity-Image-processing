import express from 'express';
import routes from './routes';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());

app.use('/api', routes);

app.listen('3000', () => {
  console.log(`Server started on port 3000`);
});

export default app;
