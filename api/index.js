import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 8800;
app.listen(port, () => {
    console.log(`Serwer nasłuchiwa na porcie ${port}`);
});
