import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";

//Routes imports
import adminRoutes from "./routes/adminAuth.js";
import projectRoutes from "./routes/project.route.js";
import skillsRoutes from "./routes/skill.route.js";
import experienceRoutes from "./routes/experience.route.js";
import emailRoutes from "./routes/email.route.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API documentation for Projects & Skills",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "http://localhost:8080", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MAIN API ROUTES
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/email", emailRoutes);

//SWAGGER URL FOR VIEWING ROUTE DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(port, () => {
  console.log("Server started at port: ", port);
});
