import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

 const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
     res.json("Authorization header missing or invalid" );
      return
  }

  const token = authHeader.split(" ")[1];

  try {
    // console.log(123,process.env.JWT_SECRET_KEY) getting this also
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string 
    ) as JwtPayload;
    // console.log('am going through middle',decodedToken)

    if (decodedToken.role !== "admin") {
       res.json("Unauthorized access" );
       return 
    }

    next();
  } catch (error: any) {
    console.error("Error decoding token:", error.message);
     res.json( "Not found" );
     return
  }
};

export default adminAuth;