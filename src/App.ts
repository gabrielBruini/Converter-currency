import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
//import passport from './config/authentication-strategies';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import errorMiddleware from './middlewares/error-middleware';
import notFoundMiddleware from './middlewares/not-found-middleware';
import Logger, { stream } from './config/logger';
//import { db } from './services/database/db';

export default class App {
  private readonly app = express();
  // private readonly database = db;
  private readonly dev =
    (process.env.NODE_ENV || 'development') === 'development';

  private middlewares() {
    this.app.use(morgan('common', { skip: () => !this.dev, stream: stream }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use(router);
    this.app.all('*', notFoundMiddleware);
    // this.app.use(passport.initialize());
    this.app.use(errorMiddleware);
  }

  // async assertDatabaseConnection(): Promise<void> {
  //   return this.database.raw('select 1+1 as result').catch((err) => {
  //     Logger.error(
  //       '[Fatal] Failed to establish connection to database! Exiting...',
  //     );
  //     Logger.error(err);
  //     process.exit(1);
  //   });
  // }

  public async start(): Promise<Express> {
    // await this.assertDatabaseConnection();

    this.middlewares();
    this.routes();

    return this.app;
  }

  public async stop(): Promise<void> {
    //  await this.database.destroy();
  }
}
