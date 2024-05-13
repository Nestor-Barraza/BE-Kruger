import express, { Application } from "express";
import "colors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./modules/routes";
import databaseConnect from "./config/database";
import { errorHandler } from "./utils/middlewares/errors";

const app: Application = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

const swaggerSpec = require("../public/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

app.use(
  (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
);

app.listen(port, () => {
  const swaggerUrl = `http://localhost:${port}/api-docs`.bgBlue;
  console.log(`Server listening on port ${port}`.cyan);
  console.log(
    `Swagger documentation available at:`.bgGreen +
      ` ${swaggerUrl.white.underline}`
  );
});

databaseConnect();