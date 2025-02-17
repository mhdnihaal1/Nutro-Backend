import express, { Request, Response, NextFunction } from "express";

//controller import
import AdminController from "../../controllerLayer/adminController/adminController";

//usecase import
import AdminUsecase from "../../usecaseLayer/admin/AdminUsecase";


import errorHandle from '../middleware/ErrorHandlingMiddleware';
import adminAuth  from '../middleware/AdminMiddleware';

//repository import
import AdminRepository from "../repository/admin/AdminRepository";

//services import
import EncryptPassword from "../services/bcrypt-password";
import JWTToken from "../services/generate-token";
import GenerateEmail from "../services/send-email";

//services
const encryptPassword = new EncryptPassword();
const jwtToken = new JWTToken();
const generateEmail = new GenerateEmail();

//repositories
const adminRepository = new AdminRepository();

//useCases
const adminUsecase = new AdminUsecase(
  adminRepository,
  encryptPassword,
  jwtToken,
  generateEmail
);

//controllers
const adminController = new AdminController(adminUsecase);

const route = express.Router();

route.post("/addAdmin", (req, res, next) => {
  adminController.addAdmin(req, res, next);
});
route.post("/login", (req, res, next) => {
  adminController.login(req, res, next);
});
route.get("/getOrders", (req, res, next) => {
  adminController.getOrders(req, res, next);
});


route.post("/addService",adminAuth, (req, res, next) => {
  adminController.addService(req, res, next);
});
route.post("/addDeliveryMode",adminAuth, (req, res, next) => {
  adminController.addDeliveryMode(req, res, next);
});


route.get("/getMaps", (req, res, next) => {
  adminController.getMaps(req, res, next);
});
route.post("/addMap", adminAuth,(req, res, next) => {
  adminController.addMap(req, res, next);
});
route.post("/deleteMap",adminAuth, (req, res, next) => {
  adminController.deleteMap(req, res, next);
});
route.post("/editMap",adminAuth, (req, res, next) => {
  adminController.editMap(req, res, next);
});


route.get("/getUsers", (req, res, next) => {
  adminController.getUsers(req, res, next);
});
route.post("/UserStatus",adminAuth, (req, res, next) => {
  adminController.UserStatus(req, res, next);
});


route.get("/getItems", (req, res, next) => {
  adminController.getItems(req, res, next);
});
route.post("/addClothItem",adminAuth, (req, res, next) => {
  adminController.addClothItem(req, res, next);
});
route.post("/editClothItem",adminAuth, (req, res, next) => {
  adminController.editClothItem(req, res, next);
});
route.post("/deleteItem",adminAuth, (req, res, next) => {
  adminController.deleteItem(req, res, next);
});


route.post("/addAgent",adminAuth, (req, res, next) => {
  adminController.addAgent(req, res, next);
});
route.get("/getAgents", (req, res, next) => {
  adminController.getAgents(req, res, next);
});
route.post("/editAgent",adminAuth, (req, res, next) => {
  adminController.editAgent(req, res, next);
});
route.post("/agentStatus",adminAuth, (req, res, next) => {
  adminController.agentStatus(req, res, next);
});


route.post("/addOffers",adminAuth, (req, res, next) => {
  adminController.addOffer(req, res, next);
});
route.get("/getOffers", (req, res, next) => {
  adminController.getOffers(req, res, next);
});
route.post("/deleteOffer",adminAuth, (req, res, next) => {
  adminController.deleteOffer(req, res, next);
});
route.post("/editOffer",adminAuth, (req, res, next) => {
  adminController.editOffer(req, res, next);
});


route.post("/sendReply",adminAuth, (req, res, next) => {
  adminController.sendReply(req, res, next);
});
route.get("/getConcerns",adminAuth, (req, res, next) => {
  adminController.getConcerns(req, res, next);
});
route.post("/deleteConcern",adminAuth, (req, res, next) => {
  adminController.deleteConcern(req, res, next);
});

route.use(errorHandle);


export default route;
