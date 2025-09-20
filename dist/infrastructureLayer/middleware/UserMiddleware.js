"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../database/UserModel"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.json("Authorization header missing or invalid");
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (decodedToken.role !== "user") {
            res.json("Unauthorized access");
            return;
        }
        console.log(decodedToken);
        const userId = decodedToken.userId;
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            res.json("User not found");
            return;
        }
        if ((user === null || user === void 0 ? void 0 : user.userStatus) === true) {
            res.json("User is blocked");
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error decoding token:", error.message);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
});
exports.default = userAuth;
