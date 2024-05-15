import express, { Application } from "express";
import "colors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import databaseConnect from "./config/database";
import { errorHandler } from "./middlewares/errors";
import { authMiddleware } from "./middlewares/session";

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

const swaggerSpec = require("./utils/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
app.use(authMiddleware);

app.listen(port, () => {
  const swaggerUrl = `${process.env.BASE_URL}/api-docs`.bgBlue;
  console.log(`Server listening on port ${port}`.cyan);
  console.log(
    `Swagger documentation available at:`.bgGreen +
      ` ${swaggerUrl.white.underline}`
  );
});

databaseConnect();
