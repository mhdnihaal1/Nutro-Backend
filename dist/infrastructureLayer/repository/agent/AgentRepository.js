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
const AgentModel_1 = __importDefault(require("../../database/AgentModel"));
const AgentModel_2 = __importDefault(require("../../database/AgentModel"));
const OrderModel_1 = __importDefault(require("../../database/OrderModel"));
class AgentRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AgentData = yield AgentModel_2.default.findOne({ email: email });
                return AgentData ? AgentData.toObject() : null;
            }
            catch (error) {
                console.error("Error in findByEmail:", error);
                return null;
            }
        });
    }
    findOrders(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderModel_1.default.find({ agentId: agentId })
                    .populate("userId")
                    .populate("agentId")
                    .populate({
                    path: "clothItems.clothItemId",
                    model: "ClothItem",
                    select: "name category",
                });
                return orders;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agentAccept(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderModel_1.default.findByIdAndUpdate({ _id: id }, { status: "agentAccepted" })
                    .populate("userId")
                    .populate("agentId")
                    .populate({
                    path: "clothItems.clothItemId",
                    model: "ClothItem",
                    select: "name category",
                });
                return orders;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agentDeliveredOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderModel_1.default.findByIdAndUpdate({ _id: id }, { status: "delivered" })
                    .populate("userId")
                    .populate("agentId")
                    .populate({
                    path: "clothItems.clothItemId",
                    model: "ClothItem",
                    select: "name category",
                });
                return orders;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield AgentModel_1.default.findOne({ _id: id });
                return agent;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMapData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield AgentModel_1.default.findOne({ _id: id }).populate("map");
                return agent;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    newPassword(id, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield AgentModel_1.default.findOneAndUpdate({ _id: id }, { password: hash });
                return agent;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = AgentRepository;
