import express, { Application } from "express";
import "colors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import databaseConnect from "./config/database";
import { errorHandler } from "./middlewares/errors";
import bodyParser from "body-parser";
import * as path from "path";

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "utils", "templates")));

app.use(bodyParser.json());

app.use(bodyParser.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = require("./utils/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

// Routes
RegisterRoutes(app);

app.get("/", (req, res) => {
  res.sendFile("home.html", {
    root: path.join(__dirname, "utils", "templates"),
  });
});

app.listen(port, () => {
  const swaggerUrl = `${process.env.BASE_URL}/api-docs`.bgBlue;
  console.log(`Server listening on port ${port}`.cyan);
  console.log(
    `Swagger documentation available at:`.bgGreen +
      ` ${swaggerUrl.white.underline}`
  );
});

databaseConnect();
