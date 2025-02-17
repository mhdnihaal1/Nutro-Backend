import { Request, Response, NextFunction } from "express";

const errorHandle = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.error(error.message); 

   res.status(500).json({
    success: false,
    message: error.message || "Something went wrong on error handling",
  });
};

export default errorHandle;
