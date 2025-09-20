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
    constructor(adminUsecase) {
        this.adminUsecase = adminUsecase;
    }
    addAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone } = req.body;
                const saved = yield this.adminUsecase.AddAdmin(name, email, password, phone);
                return res.status(200).json(saved);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.adminUsecase.Login(email, password);
                return res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addAgent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, map } = req.body;
                const m = yield this.adminUsecase.getOneMap(map);
                const saved = yield this.adminUsecase.addAgent(name, email, password, phone, m._id);
                return res.status(200).json(saved);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addMap(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sl_no, place, pincode, latitude_longitude } = req.body;
                const saved = yield this.adminUsecase.addMap(sl_no, place, pincode, latitude_longitude);
                return res.status(200).json(saved);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addClothItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, category, icon, prices } = req.body;
                const saved = yield this.adminUsecase.addClothItem(name, category, icon, prices);
                return res.status(200).json(saved);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addOffer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, expirationDate, isActive } = req.body;
                const saved = yield this.adminUsecase.addOffer(name, price, expirationDate, isActive);
                return res.status(200).json(saved);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addDeliveryMode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mode, rate } = req.body;
                if (!mode || !rate) {
                    return res.status(400).json({ message: "Mode and rate are required." });
                }
                const newDeliveryMode = yield this.adminUsecase.addDeliveryMode(mode, rate);
                return res.status(201).json(newDeliveryMode);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getAgents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getAgents();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getMaps(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getMaps();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getItems(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getItems();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOffers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getOffers();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getOrders();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getUsers();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteMap(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.adminUsecase.deleteOneMap(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editMap(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, sl_no, place, pincode, latitude_longitude } = req.body.newMap;
                const response = yield this.adminUsecase.EditOneMap(_id, sl_no, place, pincode, latitude_longitude);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.adminUsecase.deleteOneItem(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteOffer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.adminUsecase.deleteOneOffer(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    UserStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.adminUsecase.userStatus(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agentStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.adminUsecase.agentStatus(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editAgent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, email, password, phone, map } = req.body;
                const response = yield this.adminUsecase.editAgent(_id, name, email, password, phone, map);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editClothItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, category, icon, prices } = req.body;
                const response = yield this.adminUsecase.editClothItem(_id, name, category, icon, prices);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editOffer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, name, price, expirationDate, isActive } = req.body;
                const response = yield this.adminUsecase.editOffer(_id, name, price, expirationDate, isActive);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getConcerns(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminUsecase.getConcerns();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendReply(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { concernId, userId, replyTextr } = req.body;
                const response = yield this.adminUsecase.sendReply(userId, replyTextr);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteConcern(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { concernId } = req.body;
                const response = yield this.adminUsecase.deleteConcern(concernId);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = adminController;
