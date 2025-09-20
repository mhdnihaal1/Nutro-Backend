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
const mongoose_1 = __importDefault(require("mongoose"));
class AdminUsecase {
    constructor(AdminRepository, EncryptPassword, jwtToken, generateEmail) {
        this.AdminRepository = AdminRepository;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.generateEmail = generateEmail;
    }
    AddAdmin(name, email, password, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const hashedPassword = yield this.EncryptPassword.encryptPassword(password);
            const admin = {
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone,
            };
            const newAdmin = Object.assign(Object.assign({}, admin), { _id: new mongoose_1.default.Types.ObjectId().toString(), phone: Number(admin.phone), createdAt: new Date(), updatedAt: new Date() });
            const saved = yield this.AdminRepository.AddAdmin(newAdmin);
            if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                return {
                    success: true,
                    status: 200,
                    data: {
                        data: saved,
                        status: true,
                        message: "Admin created successfully",
                    },
                };
            }
            else {
                return {
                    success: false,
                    status: saved === null || saved === void 0 ? void 0 : saved.status,
                    data: {
                        status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                        message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                    },
                };
            }
        });
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.AdminRepository.findByEmail(email);
            let token = "";
            if (admin) {
                let data = {
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    phone: admin.phone,
                };
                const passwordMatch = yield this.EncryptPassword.compare(password, admin.password);
                if (passwordMatch) {
                    token = yield this.JwtToken.generateToken(data._id, "admin");
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
    addAgent(name, email, password, phone, map) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const hashedPassword = yield this.EncryptPassword.encryptPassword(password);
            const agent = {
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone,
                map: new mongoose_1.default.Types.ObjectId(map),
            };
            const newAgent = Object.assign(Object.assign({}, agent), { _id: new mongoose_1.default.Types.ObjectId(), phone: Number(agent.phone), agentStatus: false, createdAt: new Date(), updatedAt: new Date() });
            const saved = yield this.AdminRepository.AddAgent(newAgent);
            if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                return {
                    success: true,
                    status: 200,
                    data: {
                        data: saved,
                        status: true,
                        message: "Agent created successfully",
                    },
                };
            }
            else {
                return {
                    success: false,
                    status: saved === null || saved === void 0 ? void 0 : saved.status,
                    data: {
                        status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                        message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                    },
                };
            }
        });
    }
    addMap(sl_no, place, pincode, latitude_longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const newMap = {
                    sl_no: sl_no,
                    place: place,
                    pincode: pincode,
                    latitude_longitude: latitude_longitude,
                    _id: new mongoose_1.default.Types.ObjectId().toString(), // Use ObjectId directly
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const saved = yield this.AdminRepository.AddMap(newMap);
                if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                    return {
                        success: true,
                        status: 200,
                        data: {
                            data: saved,
                            status: true,
                            message: "Map created successfully",
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        status: saved === null || saved === void 0 ? void 0 : saved.status,
                        data: {
                            status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                            message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                        },
                    };
                }
            }
            catch (error) {
                console.error("Error in addMap:", error);
            }
        });
    }
    addClothItem(name, category, icon, prices) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const newClothItem = {
                    name: name,
                    category: category,
                    icon: icon,
                    prices: prices,
                    _id: new mongoose_1.default.Types.ObjectId().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const saved = yield this.AdminRepository.AddClothItem(newClothItem);
                if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                    return {
                        success: true,
                        status: 200,
                        data: {
                            data: saved,
                            status: true,
                            message: "Clothitem created successfully",
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        status: saved === null || saved === void 0 ? void 0 : saved.status,
                        data: {
                            status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                            message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                        },
                    };
                }
            }
            catch (error) {
                console.error("Error in addClothItem:", error);
            }
        });
    }
    addOffer(name, price, expirationDate, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const newOffer = {
                    name: name,
                    price: price,
                    expirationDate: expirationDate,
                    isActive: isActive,
                    _id: new mongoose_1.default.Types.ObjectId().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const saved = yield this.AdminRepository.AddOffer(newOffer);
                if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                    return {
                        success: true,
                        status: 200,
                        data: {
                            data: saved,
                            status: true,
                            message: "Offer created successfully",
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        status: saved === null || saved === void 0 ? void 0 : saved.status,
                        data: {
                            status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                            message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                        },
                    };
                }
            }
            catch (error) {
                console.error("Error in addOffer:", error);
            }
        });
    }
    addDeliveryMode(mode, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const saved = yield this.AdminRepository.addDeliveryMode(mode, rate);
                if ((saved === null || saved === void 0 ? void 0 : saved.status) !== 409) {
                    return {
                        success: true,
                        status: 200,
                        data: {
                            data: saved,
                            status: true,
                            message: "DeliveryMode created successfully",
                        },
                    };
                }
                else {
                    return {
                        success: false,
                        status: saved === null || saved === void 0 ? void 0 : saved.status,
                        data: {
                            status: (_a = saved === null || saved === void 0 ? void 0 : saved.data) === null || _a === void 0 ? void 0 : _a.status,
                            message: (_b = saved === null || saved === void 0 ? void 0 : saved.data) === null || _b === void 0 ? void 0 : _b.message,
                        },
                    };
                }
            }
            catch (error) {
                console.error("Error in addOffer:", error);
            }
        });
    }
    getAgents() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getAgents();
            return result;
        });
    }
    getMaps() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getMaps();
            return result;
        });
    }
    getOneMap(mapplace) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getOneMap(mapplace);
            return result;
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getItems();
            return result;
        });
    }
    getOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getOffers();
            return result;
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getOrders();
            return result;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getUsers();
            return result;
        });
    }
    deleteOneMap(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.deleteOneMap(id);
            return result;
        });
    }
    EditOneMap(_id, sl_no, place, pincode, latitude_longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.EditOneMap(_id, sl_no, place, pincode, latitude_longitude);
            return result;
        });
    }
    deleteOneItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.deleteOneItem(id);
            return result;
        });
    }
    deleteOneOffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.deleteOneOffer(id);
            return result;
        });
    }
    userStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.userStatus(id);
            return result;
        });
    }
    agentStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.agentStatus(id);
            return result;
        });
    }
    editAgent(_id, name, email, password, phone, map) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.EncryptPassword.encryptPassword(password);
            const result = yield this.AdminRepository.editAgent(_id, name, email, hashedPassword, phone, map);
            return result;
        });
    }
    editClothItem(_id, name, category, icon, prices) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.editClothItem(_id, name, category, icon, prices);
            return result;
        });
    }
    editOffer(_id, name, price, expirationDate, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.editOffer(_id, name, price, expirationDate, isActive);
            return result;
        });
    }
    getConcerns() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.getConcerns();
            return result;
        });
    }
    sendReply(userId, replyTextr) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.AdminRepository.getOneUser(userId);
            yield this.generateEmail.sendConcernReplyMail(user === null || user === void 0 ? void 0 : user.email, replyTextr);
            return "Reply sent successfully!";
        });
    }
    deleteConcern(concernId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.AdminRepository.deleteConcern(concernId);
            return result;
        });
    }
}
exports.default = AdminUsecase;
