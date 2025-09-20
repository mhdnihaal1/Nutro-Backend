"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller import
const userController_1 = __importDefault(require("../../controllerLayer/userController/userController"));
//usecase import
const UserUsecase_1 = __importDefault(require("../../usecaseLayer/user/UserUsecase"));
// error handle
const ErrorHandlingMiddleware_1 = __importDefault(require("../middleware/ErrorHandlingMiddleware"));
const UserMiddleware_1 = __importDefault(require("../middleware/UserMiddleware"));
//repository import
const UserRepository_1 = __importDefault(require("../repository/user/UserRepository"));
//services import
const generate_otp_1 = __importDefault(require("../services/generate-otp"));
const bcrypt_password_1 = __importDefault(require("../services/bcrypt-password"));
const send_email_1 = __importDefault(require("../services/send-email"));
const generate_token_1 = __importDefault(require("../services/generate-token"));
//services
const generateOtp = new generate_otp_1.default();
// const sendOtp = new SendOtp();
const encryptPassword = new bcrypt_password_1.default();
const generateEmail = new send_email_1.default();
const jwtToken = new generate_token_1.default();
//repositories
const userRepository = new UserRepository_1.default();
//useCases
const userUsecase = new UserUsecase_1.default(userRepository, generateOtp, encryptPassword, jwtToken, generateEmail);
//controllers
const userController = new userController_1.default(userUsecase);
const route = express_1.default.Router();
route.post("/signup", (req, res, next) => {
    userController.signUp(req, res, next);
});
route.post("/verifyotp", (req, res, next) => {
    userController.verifyOtp(req, res, next);
});
route.post("/login", (req, res, next) => {
    userController.login(req, res, next);
});
route.post("/addtocart", UserMiddleware_1.default, (req, res, next) => {
    userController.addtocart(req, res, next);
});
route.post("/deleteCartItem", UserMiddleware_1.default, (req, res, next) => {
    userController.deleteCartItem(req, res, next);
});
route.post("/quantityChange", UserMiddleware_1.default, (req, res, next) => {
    userController.quantityChange(req, res, next);
});
route.post("/AddAddress", UserMiddleware_1.default, (req, res, next) => {
    userController.AddAddress(req, res, next);
});
route.post("/deleteAddress", UserMiddleware_1.default, (req, res, next) => {
    userController.deleteAddress(req, res, next);
});
route.post("/editAddress", UserMiddleware_1.default, (req, res, next) => {
    userController.editAddress(req, res, next);
});
route.post("/placeOrder", UserMiddleware_1.default, (req, res, next) => {
    userController.placeOrder(req, res, next);
});
route.get("/getItems", (req, res, next) => {
    userController.getItems(req, res, next);
});
route.get("/getCart", (req, res, next) => {
    userController.getCart(req, res, next);
});
route.get("/getAddress", (req, res, next) => {
    userController.getAddress(req, res, next);
});
route.get("/getDeliveryMode", (req, res, next) => {
    userController.getDeliveryMode(req, res, next);
});
route.post("/getOrders", (req, res, next) => {
    userController.getOrders(req, res, next);
});
route.post("/changePassword", UserMiddleware_1.default, (req, res, next) => {
    userController.changePassword(req, res, next);
});
route.post("/handleCancelorder", UserMiddleware_1.default, (req, res, next) => {
    userController.handleCancelorder(req, res, next);
});
route.post("/sendConcern", UserMiddleware_1.default, (req, res, next) => {
    userController.sendConcern(req, res, next);
});
route.post("/sendEmail", (req, res, next) => {
    userController.sendEmail(req, res, next);
});
route.post("/SavePassword", (req, res, next) => {
    userController.SavePassword(req, res, next);
});
route.use(ErrorHandlingMiddleware_1.default);
exports.default = route;
