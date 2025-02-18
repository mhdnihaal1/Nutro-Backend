import mongoose, { Schema, Document, Model, Types } from "mongoose";
import AgentRepository from "../../infrastructureLayer/repository/agent/AgentRepository";
import EncryptPassword from "../../infrastructureLayer/services/bcrypt-password";
import JWTToken from "../../infrastructureLayer/services/generate-token";
import sendOtp from "../../infrastructureLayer/services/send-email";

import IUser from "../../domainLayer/userDomain";

class AgentUsecase {
  private AgentRepository: AgentRepository;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private generateEmail: sendOtp;

  constructor(
    AgentRepository: AgentRepository,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    generateEmail: sendOtp
  ) {
    this.AgentRepository = AgentRepository;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.generateEmail = generateEmail;
  }

  async Login(email: string, password: string) {
    const agent = await this.AgentRepository.findByEmail(email);
    let token = "";

    if (agent) {
      let data = {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
      };

      const passwordMatch = await this.EncryptPassword.compare(
        password,
        agent.password
      );

      if (passwordMatch) {
        token = await this.JwtToken.generateToken(data._id.toString(), "agent");

        return {
          status: 200,
          data: {
            status: true,
            message: data,
            token,
          },
        };
      } else {
        return {
          status: 400,
          data: {
            status: false,
            message: "Invalid email or password",
            token: "",
          },
        };
      }
    } else {
      return {
        status: 400,
        data: {
          status: false,
          message: "Invalid email or password",
          token: "",
        },
      };
    }
  }

  async getAgentOrder(agentId: string) {
    const orders = await this.AgentRepository.findOrders(agentId);
    return orders;
  }

  async agentAccept(id: string) {
    const orders = await this.AgentRepository.agentAccept(id);
    return orders;
  }

  async agentDeliver(id: string) {
    const orders = await this.AgentRepository.agentDeliveredOrder(id);
    const email = orders?.userId?.email;

    await this.generateEmail.sendEmailForDelivery(email);

    return orders;
  }

  async agentAgent(id: string) {
    const agent = await this.AgentRepository.agent(id);
    return agent;
  }

  async getMapData(id: string) {
    const map = await this.AgentRepository.getMapData(id);
    return map;
  }

  async comparepassword(id: string, password: string) {
    const agent = await this.AgentRepository.agent(id);

    const compare = await this.EncryptPassword.compare(
      password,
      agent.password
    );

    if (!compare) {
      return {
        status: 400,
        data: {
          status: false,
          message: "Invalid  password",
        },
      };
    }
    return compare;
  }

  async changePassword(id: string, password: string) {
    const hash = await this.EncryptPassword.encryptPassword(password);

    const agent = await this.AgentRepository.newPassword(id, hash);

    return agent;
  }

  async forForgotPassword(email: string, otp: string) {
    const sended = this.generateEmail.sendMail(email, Number(otp));

    console.log(sended);
    return "Forget password sended successfully"
  }
}

export default AgentUsecase;
