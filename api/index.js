import express from "express";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);

const port = 8800;
app.listen(port, () => {
    console.log(`Serwer nasłuchiwa na porcie ${port}`);
});
