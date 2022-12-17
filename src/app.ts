// require('dotenv').config();

import express from 'express';
import routes  from "./routes";
// import compress from 'compression';
// import cors from 'cors';
// import morgan from 'morgan';
// import connectDB from './config/connectDB';
// import config from './config/env';
// import errorHandler from './middlewares/error-handler';
// import routes from './routes';
// import { IS_PROD } from './constants/defines';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(compress());

// // enable CORS - Cross Origin Resource Sharing
// app.use(
//   cors({
//     origin: config.origin,
//     credentials: true,
//   }),
// );

// // log routes
// if (!IS_PROD) {
//   app.use(morgan('dev'));
// }

// mount all routes on /api/v1 path
// JWT middleware except for authentication requests
// app.use(/\/(?!api\/v1).*/, jwtMiddleware.verifyToken);

// mount all routes on /api/v2 path
app.use('/api', routes);

// errorHandler - response error as json
// app.use(errorHandler);

app.listen('3000', () => {
  console.log(`Server started on port 300)`);
  //   console.log(`Server started on port ${config.port} (${config.env})`);
});
//   } catch (error) {
//     console.log(error)
//     console.log(`error [main]`, error);
//     process.exit(1);
//   }
// };

// main();
