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
const AdminModel_1 = __importDefault(require("../../database/AdminModel"));
const AgentModel_1 = __importDefault(require("../../database/AgentModel"));
const MapModel_1 = __importDefault(require("../../database/MapModel"));
const ClothItemModel_1 = __importDefault(require("../../database/ClothItemModel"));
const OfferModel_1 = __importDefault(require("../../database/OfferModel"));
const DeliveryModel_1 = __importDefault(require("../../database/DeliveryModel"));
const OrderModel_1 = __importDefault(require("../../database/OrderModel"));
const UserModel_1 = __importDefault(require("../../database/UserModel"));
const ConcernModel_1 = __importDefault(require("../../database/ConcernModel"));
const mongoose_1 = __importDefault(require("mongoose"));
class UserRepository {
    AddAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = admin;
            const existUser = yield AdminModel_1.default.findOne({ email: email });
            if (existUser) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        status: false,
                        message: "Admin already  exist",
                    },
                };
            }
            const newAdmin = new AdminModel_1.default(admin);
            const savedAdmin = yield newAdmin.save();
            return savedAdmin.toObject();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AdminData = yield AdminModel_1.default.findOne({ email: email });
                return AdminData ? AdminData.toObject() : null; // Convert if found
            }
            catch (error) {
                console.error("Error in findByEmail:", error);
                return null;
            }
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield AdminModel_1.default.findById(_id);
            return userData ? userData.toObject() : null; // Convert if found
        });
    }
    AddAgent(agent) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = agent;
            const existAgent = yield AgentModel_1.default.findOne({ email: email });
            if (existAgent) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        status: false,
                        message: "Agent already  exist",
                    },
                };
            }
            const newAgent = new AgentModel_1.default(agent);
            const savedAgent = yield newAgent.save();
            return savedAgent;
        });
    }
    AddMap(map) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sl_no } = map;
            const existMap = yield MapModel_1.default.findOne({ sl_no: sl_no });
            if (existMap) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        status: false,
                        message: "Map already  exist",
                    },
                };
            }
            const newMap = new MapModel_1.default(map);
            const savedMap = yield newMap.save();
            return savedMap;
        });
    }
    AddClothItem(clothitem) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = clothitem;
            const existClothitem = yield ClothItemModel_1.default.findOne({
                name: { $regex: name, $options: "i" },
            });
            if (existClothitem) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        status: false,
                        message: "Clothitem already  exist",
                    },
                };
            }
            const newclothitem = new ClothItemModel_1.default(clothitem);
            const savedclothitem = yield newclothitem.save();
            return savedclothitem;
        });
    }
    AddOffer(offer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = offer;
            const existOffer = yield OfferModel_1.default.findOne({
                name: { $regex: name, $options: "i" },
            });
            if (existOffer) {
                return {
                    success: false,
                    status: 409,
                    data: {
                        status: false,
                        message: "Offer already  exist",
                    },
                };
            }
            const newoffer = new OfferModel_1.default(offer);
            const savedoffer = yield newoffer.save();
            return savedoffer;
        });
    }
    addDeliveryMode(mode, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existMode = yield DeliveryModel_1.default.findOne({ mode: mode });
                if (existMode) {
                    return {
                        success: false,
                        status: 409,
                        data: {
                            status: false,
                            message: "Mode already  exist",
                        },
                    };
                }
                const newDeliveryMode = new DeliveryModel_1.default({ mode, rate });
                const saved = yield newDeliveryMode.save();
                return saved;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAgents() {
        return __awaiter(this, void 0, void 0, function* () {
            const agents = yield AgentModel_1.default.find().populate("map");
            return agents;
        });
    }
    getMaps() {
        return __awaiter(this, void 0, void 0, function* () {
            const maps = yield MapModel_1.default.find();
            return maps;
        });
    }
    getOneMap(mapplace) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield MapModel_1.default.findOne({ place: mapplace });
            return map;
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield ClothItemModel_1.default.find();
            return items;
        });
    }
    getOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            const offers = yield OfferModel_1.default.find();
            return offers;
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderModel_1.default.find()
                .populate("userId")
                .populate("agentId")
                .populate({
                path: "clothItems.clothItemId",
                model: "ClothItem",
            });
            return orders;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield UserModel_1.default.find();
            return users;
        });
    }
    deleteOneMap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield MapModel_1.default.findOneAndDelete({ _id: id });
            return users;
        });
    }
    EditOneMap(_id, sl_no, place, pincode, latitude_longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield MapModel_1.default.findOneAndUpdate({ _id: _id }, {
                sl_no,
                place,
                pincode,
                latitude_longitude,
            }, { new: true });
            return result;
        });
    }
    deleteOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield ClothItemModel_1.default.findOneAndDelete({ _id: id });
            return users;
        });
    }
    deleteOneOffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield OfferModel_1.default.findOneAndDelete({ _id: id });
            return users;
        });
    }
    userStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield UserModel_1.default.findOne({ _id: id }));
            if (user) {
                user.userStatus = !user.userStatus;
                yield user.save();
            }
            return user;
        });
    }
    agentStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield AgentModel_1.default.findOne({ _id: id });
            if (!agent) {
                throw new Error("Agent not found");
            }
            agent.agentStatus = !agent.agentStatus;
            yield agent.save();
            return yield AgentModel_1.default.findById(id);
        });
    }
    editAgent(_id, name, email, password, phone, map) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { name, email, password, phone };
            if (map) {
                updateData.map = new mongoose_1.default.Types.ObjectId(map);
            }
            const result = yield AgentModel_1.default.findOneAndUpdate({ _id }, updateData, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    editClothItem(_id, name, category, icon, prices) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = { name, category, icon, prices };
            const result = yield ClothItemModel_1.default.findOneAndUpdate({ _id }, updateData, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    editOffer(_id, name, price, expirationDate, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateData = {
                name,
                price,
                expirationDate,
                isActive,
            };
            const result = yield OfferModel_1.default.findOneAndUpdate({ _id }, updateData, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    getConcerns() {
        return __awaiter(this, void 0, void 0, function* () {
            const concerns = yield ConcernModel_1.default.find();
            return concerns;
        });
    }
    getOneUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({ _id: userId });
            return user;
        });
    }
    deleteConcern(concernId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield ConcernModel_1.default.findOneAndDelete({ _id: concernId });
            return res;
        });
    }
}
exports.default = UserRepository;
