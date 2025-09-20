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
Object.defineProperty(exports, "__esModule", { value: true });
class adminController {
    constructor(agentUsecase) {
        this.agentUsecase = agentUsecase;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const agent = yield this.agentUsecase.Login(email, password);
                return res.status(200).json(agent);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAgentOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { agentId } = req.body;
                const orders = yield this.agentUsecase.getAgentOrder(agentId);
                return res.status(200).json(orders);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    acceptOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const orders = yield this.agentUsecase.agentAccept(id);
                return res.status(200).json(orders);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deliveredOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const orders = yield this.agentUsecase.agentDeliver(id);
                return res.status(200).json(orders);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAgentData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const agent = yield this.agentUsecase.agentAgent(id);
                return res.status(200).json(agent);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMapData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const map = yield this.agentUsecase.getMapData(id);
                return res.status(200).json(map);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    oldPasswordcheck(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, password } = req.body;
                const passwordCompare = yield this.agentUsecase.comparepassword(id, password);
                return res.status(200).json({ passwordCompare });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, password } = req.body;
                const newpassword = yield this.agentUsecase.changePassword(id, password);
                return res.status(200).json({ newpassword });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const newpassword = yield this.agentUsecase.forForgotPassword(email, otp);
                return res.status(200).json({ newpassword });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = adminController;
