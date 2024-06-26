import express, { Application } from "express";
import cors from "cors";
import router from "./routes/routes";
import errorHandler from "./middlewares/errorHandler";
import { NotFoundErr } from "./exception/NotFoundError";
import env from "./utils/envConfig";
import AuthErrorCode from "./utils/ErrorCode";
import mysqlDatabase from "./databases/mysqlDatabase";
import cookieParser from 'cookie-parser';
import stripeController from "./modules/stripe/stripe.controller";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDocument from "./utils/swagger.json"
class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorHandle();
  }

  private middleware() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.post("/webhook", express.raw({ type: 'application/json' }),  stripeController.listenEvent)
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private routes() {
    this.app.use("/api", router);
    this.app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerDocument)));
    this.app.use("*", () => {
      throw new NotFoundErr({
        errorCode: AuthErrorCode.NOT_FOUND,
        errorMessage: "Not Found",
      });
    });
  }

  private errorHandle() {
    this.app.use(errorHandler);
  }

  public async listen() {
    const PORT = env.portServer;
    const HOST = env.getHost;
    await mysqlDatabase.connect();
    this.app.listen(PORT, () => {
      console.log(`Server running at port ${HOST}:${PORT} !!`);
    });
  }
}
export default new App();
