import express from "express";
import { register, login, getMe } from "./controllers/UserController";
import checkAuth from "./utils/checkAuth";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4040;

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
