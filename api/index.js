import express from "express";
import authRouter from "./routes/auth.js";
import categoriesRouter from "./routes/categories.js";
import tournamentsRouter from "./routes/tournaments.js";
import participantsRouter from "./routes/participants.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/tournaments", tournamentsRouter);
app.use("/api/participants", participantsRouter);
app.use("/api/users", usersRouter);
app.use("*", (_, res) => { res.status(404).json({ "error": "path-not-found" }); });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message, formattable: false });
});

const port = 8800;
app.listen(port, () => {
    console.log(`Serwer nasłuchiwa na porcie ${port}`);
});
