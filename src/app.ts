// require('dotenv').config();

import express from 'express';
import routes from './routes';
// import morgan from 'morgan';
// import config from './config/env';
// import errorHandler from './middlewares/error-handler';
// import { IS_PROD } from './constants/defines';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());

// // log routes
// if (!IS_PROD) {
//   app.use(morgan('dev'));
// }

// mount all routes on /api/v2 path
app.use('/api', routes);

// errorHandler - response error as json
// app.use(errorHandler);

app.listen('3000', () => {
  console.log(`Server started on port 3000`);
  //   console.log(`Server started on port ${config.port} (${config.env})`);
});
//   } catch (error) {
//     console.log(error)
//     console.log(`error [main]`, error);
//     process.exit(1);
//   }
// };

// main();
export default app;
