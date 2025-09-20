"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const agentController_1 = __importDefault(require("../../controllerLayer/agentController/agentController"));
//usecase import
const AgentUseCase_1 = __importDefault(require("../../usecaseLayer/agent/AgentUseCase"));
const ErrorHandlingMiddleware_1 = __importDefault(require("../middleware/ErrorHandlingMiddleware"));
const AgentMiddleware_1 = __importDefault(require("../middleware/AgentMiddleware"));
//repository import
const AgentRepository_1 = __importDefault(require("../repository/agent/AgentRepository"));
//services import
const bcrypt_password_1 = __importDefault(require("../services/bcrypt-password"));
const generate_token_1 = __importDefault(require("../services/generate-token"));
const send_email_1 = __importDefault(require("../services/send-email"));
//services
const encryptPassword = new bcrypt_password_1.default();
const jwtToken = new generate_token_1.default();
const generateEmail = new send_email_1.default();
//repositories
const agentRepository = new AgentRepository_1.default();
//useCases
const agentUsecase = new AgentUseCase_1.default(agentRepository, encryptPassword, jwtToken, generateEmail);
//controllers
const agentController = new agentController_1.default(agentUsecase);
const route = express_1.default.Router();
route.post("/login", (req, res, next) => {
    agentController.login(req, res, next);
});
route.post("/getAgentOrders", (req, res, next) => {
    agentController.getAgentOrders(req, res, next);
});
route.post("/acceptOrder", AgentMiddleware_1.default, (req, res, next) => {
    agentController.acceptOrder(req, res, next);
});
route.post("/deliveredOrder", AgentMiddleware_1.default, (req, res, next) => {
    agentController.deliveredOrder(req, res, next);
});
route.post("/getAgentData", (req, res, next) => {
    agentController.getAgentData(req, res, next);
});
route.post("/getMapData", (req, res, next) => {
    agentController.getMapData(req, res, next);
});
route.post("/oldPasswordcheck", AgentMiddleware_1.default, (req, res, next) => {
    agentController.oldPasswordcheck(req, res, next);
});
route.post("/changePassword", AgentMiddleware_1.default, (req, res, next) => {
    agentController.changePassword(req, res, next);
});
route.post("/sendOtp", AgentMiddleware_1.default, (req, res, next) => {
    agentController.sendOtp(req, res, next);
});
route.use(ErrorHandlingMiddleware_1.default);
exports.default = route;
