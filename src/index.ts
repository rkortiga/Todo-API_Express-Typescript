import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import todoRouter from "./api/routers/TodoRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routers
app.use("/todos", todoRouter);

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
