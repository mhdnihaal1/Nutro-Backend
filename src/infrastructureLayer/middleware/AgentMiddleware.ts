import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AgentModel from "../database/AgentModel";
import IAgent from "../../domainLayer/agentDomain";

const agentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.json("Authorization header missing or invalid");
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    console.log(decodedToken);
    if (decodedToken.role !== "agent") {
      res.json("Unauthorized access");
      return;
    }
    const agentId = decodedToken.userId;
    const agent = (await AgentModel.findOne({ _id: agentId })) as IAgent;
    if (!agent) {
      res.json("Agent not found");
      return;
    }

    if (agent?.agentStatus === true) {
      res.json("Agent is blocked");
      return;
    }

    next();
  } catch (error: any) {
    console.error("Error m decoding token:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default agentAuth;
