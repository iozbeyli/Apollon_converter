import cors from "cors";
import express from "express";
import controller from "./controllers/controller";

// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

export const register = (app: express.Application) => {
  const router = express.Router();
  router.use(cors(options));

  router.get("/pdf", (req, res) => controller.convert(req, res));
  app.use("/api", router);
};
