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
const AgentModel_1 = __importDefault(require("../database/AgentModel"));
const agentAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.json("Authorization header missing or invalid");
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);
        if (decodedToken.role !== "agent") {
            res.json("Unauthorized access");
            return;
        }
        const agentId = decodedToken.userId;
        const agent = yield AgentModel_1.default.findOne({ _id: agentId });
        if (!agent) {
            res.json("Agent not found");
            return;
        }
        if ((agent === null || agent === void 0 ? void 0 : agent.agentStatus) === true) {
            res.json("Agent is blocked");
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error decoding token:", error.message);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
});
exports.default = agentAuth;
