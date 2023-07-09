import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface UserAuthInfoRequest extends Request {
  userId?: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: passwordHash,
        avatarUrl: null,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      "tokenkey",
      {
        expiresIn: "14d",
      }
    );

    res.status(201).json({ user, token });
  } catch (err: any) {
    res.status(500).json({
      msg: "Error register",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPass) {
      return res.status(404).json({
        msg: "Wrong login or password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "tokenkey",
      {
        expiresIn: "14d",
      }
    );

    res.json({
      user,
      token,
    });
  } catch (err: any) {
    res.status(500).json({
      msg: "Error login",
    });
  }
};

export const getMe = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: +req.userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      msg: "No Access",
    });
  }
};

export const changeAvatar = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
    const user = await prisma.user.update({
      where: {
        id: +req.userId,
      },
      data: {
        avatarUrl: req.body.avatarUrl,
      },
      select: {
        avatarUrl: true,
      },
    });

    res.json({ msg: "Profile image has been changed", avatar: user.avatarUrl });
  } catch (err) {
    res.status(500).json({
      msg: "No Access",
    });
  }
};

export const updateProfile = async (
  req: UserAuthInfoRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }

    console.log(req.body);

    const user = await prisma.user.update({
      where: {
        id: +req.userId,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        bio: req.body.bio,
      },
    });

    res.json({ msg: "Profile has been updated", user });
  } catch (err: any) {
    res.status(500).json({
      msg: "No Access",
    });
  }
};
