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
class AgentUsecase {
    constructor(AgentRepository, EncryptPassword, jwtToken, generateEmail) {
        this.AgentRepository = AgentRepository;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.generateEmail = generateEmail;
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield this.AgentRepository.findByEmail(email);
            let token = "";
            if (agent) {
                let data = {
                    _id: agent._id,
                    name: agent.name,
                    email: agent.email,
                    phone: agent.phone,
                };
                const passwordMatch = yield this.EncryptPassword.compare(password, agent.password);
                if (passwordMatch) {
                    token = yield this.JwtToken.generateToken(data._id.toString(), "agent");
                    return {
                        status: 200,
                        data: {
                            status: true,
                            message: data,
                            token,
                        },
                    };
                }
                else {
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
            else {
                return {
                    status: 400,
                    data: {
                        status: false,
                        message: "Invalid email or password",
                        token: "",
                    },
                };
            }
        });
    }
    getAgentOrder(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.AgentRepository.findOrders(agentId);
            return orders;
        });
    }
    agentAccept(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.AgentRepository.agentAccept(id);
            return orders;
        });
    }
    agentDeliver(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const orders = yield this.AgentRepository.agentDeliveredOrder(id);
            const email = (_a = orders === null || orders === void 0 ? void 0 : orders.userId) === null || _a === void 0 ? void 0 : _a.email;
            yield this.generateEmail.sendEmailForDelivery(email);
            return orders;
        });
    }
    agentAgent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield this.AgentRepository.agent(id);
            return agent;
        });
    }
    getMapData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield this.AgentRepository.getMapData(id);
            return map;
        });
    }
    comparepassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield this.AgentRepository.agent(id);
            const compare = yield this.EncryptPassword.compare(password, agent.password);
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
        });
    }
    changePassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this.EncryptPassword.encryptPassword(password);
            const agent = yield this.AgentRepository.newPassword(id, hash);
            return agent;
        });
    }
    forForgotPassword(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const sended = this.generateEmail.sendMail(email, Number(otp));
            console.log(sended);
            return "Forget password sended successfully";
        });
    }
}
exports.default = AgentUsecase;
