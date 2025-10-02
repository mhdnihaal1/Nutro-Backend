import express, { Request, Response, NextFunction } from "express";

//controller import
import AgentController from "../../controllerLayer/agentController/agentController";

//usecase import
import AgentUsecase from "../../usecaseLayer/agent/AgentUseCase";

import errorHandle from '../middleware/ErrorHandlingMiddleware';
import agentAuth  from '../middleware/AgentMiddleware';
//repository import
import AgentRepository from "../repository/agent/AgentRepository";

//services import
import EncryptPassword from "../services/bcrypt-password";
import JWTToken from "../services/generate-token";
import GenerateEmail from "../services/send-email";

//services
const encryptPassword = new EncryptPassword();
const jwtToken = new JWTToken();
const generateEmail = new GenerateEmail();

//repositories
const agentRepository = new AgentRepository();

//useCases
const agentUsecase = new AgentUsecase(
  agentRepository,
  encryptPassword,
  jwtToken,
  generateEmail
);

//controllers
const agentController = new AgentController(agentUsecase);

const route = express.Router();

route.post("/login", (req, res, next) => {
  agentController.login(req, res, next);
});
route.post("/getAgentOrders",agentAuth, (req, res, next) => {
  agentController.getAgentOrders(req, res, next);
});
route.post("/acceptOrder", agentAuth,(req, res, next) => {
  agentController.acceptOrder(req, res, next);
});
route.post("/deliveredOrder",agentAuth, (req, res, next) => {
  agentController.deliveredOrder(req, res, next);
});
route.post("/getAgentData",agentAuth, (req, res, next) => {
  agentController.getAgentData(req, res, next);
});
route.post("/getMapData",agentAuth, (req, res, next) => {
  agentController.getMapData(req, res, next);
});
route.post("/oldPasswordcheck",agentAuth, (req, res, next) => {
  agentController.oldPasswordcheck(req, res, next);
});
route.post("/changePassword", agentAuth,(req, res, next) => {
  agentController.changePassword(req, res, next);
});
route.post("/sendOtp",agentAuth, (req, res, next) => {
  agentController.sendOtp(req, res, next);
});

route.use(errorHandle);


export default route;
