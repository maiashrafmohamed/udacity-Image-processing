"use strict";
// require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
// import morgan from 'morgan';
// import config from './config/env';
// import errorHandler from './middlewares/error-handler';
// import { IS_PROD } from './constants/defines';
const app = (0, express_1.default)();
// parse body params and attache them to req.body
app.use(express_1.default.json());
// // log routes
// if (!IS_PROD) {
//   app.use(morgan('dev'));
// }
// mount all routes on /api/v2 path
app.use('/api', routes_1.default);
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
exports.default = app;
