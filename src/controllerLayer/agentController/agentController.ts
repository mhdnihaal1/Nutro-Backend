import { Request, Response, NextFunction } from "express";
import AgentUsecase from "../../usecaseLayer/agent/AgentUseCase";

class adminController {
  private agentUsecase: AgentUsecase;

  constructor(agentUsecase: AgentUsecase) {
    this.agentUsecase = agentUsecase;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const agent = await this.agentUsecase.Login(email, password);
      return res.status(200).json(agent);
    } catch (error) {
      console.log(error);
    }
  }

  async getAgentOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { agentId } = req.body;
      const orders = await this.agentUsecase.getAgentOrder(agentId);
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }

  async acceptOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const orders = await this.agentUsecase.agentAccept(id);
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }

  async deliveredOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const orders = await this.agentUsecase.agentDeliver(id);
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }

  async getAgentData(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const agent = await this.agentUsecase.agentAgent(id);
      return res.status(200).json(agent);
    } catch (error) {
      console.log(error);
    }
  }

  async getMapData(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const map = await this.agentUsecase.getMapData(id);
      return res.status(200).json(map);
    } catch (error) {
      console.log(error);
    }
  }

  async oldPasswordcheck(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, password } = req.body;
      const passwordCompare = await this.agentUsecase.comparepassword(
        id,
        password
      );
      return res.status(200).json({ passwordCompare });
    } catch (error) {
      console.log(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, password } = req.body;
      const newpassword = await this.agentUsecase.changePassword(id, password);
      return res.status(200).json({ newpassword });
    } catch (error) {
      console.log(error);
    }
  }

  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const newpassword = await this.agentUsecase.forForgotPassword(email, otp);
      return res.status(200).json({ newpassword });
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminController;
