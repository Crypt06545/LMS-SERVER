import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import teacherRouter from "./routes/teacherRotuer.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudnary.js";

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.post("/clerk", clerkWebhooks);

app.use("/api/teacher", teacherRouter);
// port

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err);
  });

await connectCloudinary()