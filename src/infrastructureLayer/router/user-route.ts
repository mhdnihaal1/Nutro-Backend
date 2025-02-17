import express, { Request, Response, NextFunction } from "express";

//controller import
import UserController from "../../controllerLayer/userController/userController";

//usecase import
import UserUsecase from "../../usecaseLayer/user/UserUsecase";

// error handle
import errorHandle from '../middleware/ErrorHandlingMiddleware';
import userAuth  from '../middleware/UserMiddleware';


//repository import
import UserRepository from "../repository/user/UserRepository";

//services import
import GenerateOtp from "../services/generate-otp";
import SendOtp from "../services/send-email";
import EncryptPassword from "../services/bcrypt-password";
import GenerateEmail from "../services/send-email";
import JWTToken from "../services/generate-token";

//services
const generateOtp = new GenerateOtp();
// const sendOtp = new SendOtp();
const encryptPassword = new EncryptPassword();
const generateEmail = new GenerateEmail();
const jwtToken = new JWTToken();

//repositories
const userRepository = new UserRepository();

//useCases
const userUsecase = new UserUsecase(
  userRepository,
  generateOtp,
  encryptPassword,
  jwtToken,
  generateEmail
);

//controllers
const userController = new UserController(userUsecase);

const route = express.Router();

route.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});
route.post("/verifyotp", (req, res, next) => {
  userController.verifyOtp(req, res, next);
});
route.post("/login", (req, res, next) => {
  userController.login(req, res, next);
});
route.post("/addtocart" ,userAuth, (req, res, next) => {
  userController.addtocart(req, res, next);
});
route.post("/deleteCartItem", userAuth,(req, res, next) => {
  userController.deleteCartItem(req, res, next);
});
route.post("/quantityChange", userAuth,(req, res, next) => {
  userController.quantityChange(req, res, next);
});
route.post("/AddAddress", userAuth,(req, res, next) => {
  userController.AddAddress(req, res, next);
});
route.post("/deleteAddress", userAuth,(req, res, next) => {
  userController.deleteAddress(req, res, next);
});
route.post("/editAddress",userAuth, (req, res, next) => {
  userController.editAddress(req, res, next);
});
route.post("/placeOrder",userAuth, (req, res, next) => {
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
route.post("/changePassword", userAuth,(req, res, next) => {
  userController.changePassword(req, res, next);
});

route.post("/handleCancelorder",userAuth, (req, res, next) => {
  userController.handleCancelorder(req, res, next);
});
route.post("/sendConcern",userAuth, (req, res, next) => {
  userController.sendConcern(req, res, next);
});


route.post("/sendEmail", (req, res, next) => {
  userController.sendEmail(req, res, next);
});

route.post("/SavePassword", (req, res, next) => {
  userController.SavePassword(req, res, next);
});


route.use(errorHandle);
 

export default route;
