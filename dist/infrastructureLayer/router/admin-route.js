"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const adminController_1 = __importDefault(require("../../controllerLayer/adminController/adminController"));
//usecase import
const AdminUsecase_1 = __importDefault(require("../../usecaseLayer/admin/AdminUsecase"));
const ErrorHandlingMiddleware_1 = __importDefault(require("../middleware/ErrorHandlingMiddleware"));
const AdminMiddleware_1 = __importDefault(require("../middleware/AdminMiddleware"));
//repository import
const AdminRepository_1 = __importDefault(require("../repository/admin/AdminRepository"));
//services import
const bcrypt_password_1 = __importDefault(require("../services/bcrypt-password"));
const generate_token_1 = __importDefault(require("../services/generate-token"));
const send_email_1 = __importDefault(require("../services/send-email"));
//services
const encryptPassword = new bcrypt_password_1.default();
const jwtToken = new generate_token_1.default();
const generateEmail = new send_email_1.default();
//repositories
const adminRepository = new AdminRepository_1.default();
//useCases
const adminUsecase = new AdminUsecase_1.default(adminRepository, encryptPassword, jwtToken, generateEmail);
//controllers
const adminController = new adminController_1.default(adminUsecase);
const route = express_1.default.Router();
route.post("/addAdmin", (req, res, next) => {
    adminController.addAdmin(req, res, next);
});
route.post("/login", (req, res, next) => {
    adminController.login(req, res, next);
});
route.get("/getOrders", (req, res, next) => {
    adminController.getOrders(req, res, next);
});
route.post("/addService", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addService(req, res, next);
});
route.post("/addDeliveryMode", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addDeliveryMode(req, res, next);
});
route.get("/getMaps", (req, res, next) => {
    adminController.getMaps(req, res, next);
});
route.post("/addMap", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addMap(req, res, next);
});
route.post("/deleteMap", AdminMiddleware_1.default, (req, res, next) => {
    adminController.deleteMap(req, res, next);
});
route.post("/editMap", AdminMiddleware_1.default, (req, res, next) => {
    adminController.editMap(req, res, next);
});
route.get("/getUsers", (req, res, next) => {
    adminController.getUsers(req, res, next);
});
route.post("/UserStatus", AdminMiddleware_1.default, (req, res, next) => {
    adminController.UserStatus(req, res, next);
});
route.get("/getItems", (req, res, next) => {
    adminController.getItems(req, res, next);
});
route.post("/addClothItem", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addClothItem(req, res, next);
});
route.post("/editClothItem", AdminMiddleware_1.default, (req, res, next) => {
    adminController.editClothItem(req, res, next);
});
route.post("/deleteItem", AdminMiddleware_1.default, (req, res, next) => {
    adminController.deleteItem(req, res, next);
});
route.post("/addAgent", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addAgent(req, res, next);
});
route.get("/getAgents", (req, res, next) => {
    adminController.getAgents(req, res, next);
});
route.post("/editAgent", AdminMiddleware_1.default, (req, res, next) => {
    adminController.editAgent(req, res, next);
});
route.post("/agentStatus", AdminMiddleware_1.default, (req, res, next) => {
    adminController.agentStatus(req, res, next);
});
route.post("/addOffers", AdminMiddleware_1.default, (req, res, next) => {
    adminController.addOffer(req, res, next);
});
route.get("/getOffers", (req, res, next) => {
    adminController.getOffers(req, res, next);
});
route.post("/deleteOffer", AdminMiddleware_1.default, (req, res, next) => {
    adminController.deleteOffer(req, res, next);
});
route.post("/editOffer", AdminMiddleware_1.default, (req, res, next) => {
    adminController.editOffer(req, res, next);
});
route.post("/sendReply", AdminMiddleware_1.default, (req, res, next) => {
    adminController.sendReply(req, res, next);
});
route.get("/getConcerns", AdminMiddleware_1.default, (req, res, next) => {
    adminController.getConcerns(req, res, next);
});
route.post("/deleteConcern", AdminMiddleware_1.default, (req, res, next) => {
    adminController.deleteConcern(req, res, next);
});
route.use(ErrorHandlingMiddleware_1.default);
exports.default = route;
