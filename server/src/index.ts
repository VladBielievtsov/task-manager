import express, { Request, Response } from "express";
import path from "path";
import {
  register,
  login,
  getMe,
  changeAvatar,
  updateProfile,
} from "./controllers/UserController";
import checkAuth from "./utils/checkAuth";
import multer from "multer";
import cors from "cors";

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cors());

const PORT = process.env.PORT || 4040;

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);
app.patch("/me/change-avatar", checkAuth, changeAvatar);
app.put("/me/update", checkAuth, updateProfile);

app.post(
  "/upload",
  checkAuth,
  upload.single("image"),
  (req: Request, res: Response) => {
    res.json({
      url: `/uploads/${req.file?.originalname}`,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
