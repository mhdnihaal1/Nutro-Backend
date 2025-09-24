import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../database/UserModel";
import IUser from "../../domainLayer/userDomain";

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.json("Authorization header missing or invalid" );
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

    if (decodedToken.role !== "user") {
      res.json( "Unauthorized access" );
      return;
    }
    console.log(decodedToken)

    const userId = decodedToken.userId;
    const user = await UserModel.findById(userId) as IUser;

    if (!user) {
      res.json( "User not found" );
      return;
    }

    if (user?.userStatus === true) {
      res.json( "User is blocked" );
      return;
    }

    next();
  } catch (error: any) {
    console.error("Error decoding token:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
