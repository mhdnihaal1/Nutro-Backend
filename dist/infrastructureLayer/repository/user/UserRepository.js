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
const ClothItemModel_1 = __importDefault(require("../../database/ClothItemModel"));
const CartModel_1 = __importDefault(require("../../database/CartModel"));
const UserModel_1 = __importDefault(require("../../database/UserModel"));
const otpModel_1 = __importDefault(require("../../database/otpModel"));
const AddressModel_1 = __importDefault(require("../../database/AddressModel"));
const DeliveryModel_1 = __importDefault(require("../../database/DeliveryModel"));
const AgentModel_1 = __importDefault(require("../../database/AgentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const OrderModel_1 = __importDefault(require("../../database/OrderModel"));
const OrderModel_2 = __importDefault(require("../../database/OrderModel"));
const AdminModel_1 = __importDefault(require("../../database/AdminModel"));
const ConcernModel_1 = __importDefault(require("../../database/ConcernModel"));
class UserRepository {
    AddUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new UserModel_1.default(user);
            const savedUser = yield newUser.save();
            return savedUser.toObject();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield UserModel_1.default.findOne({ email: email });
                return userData ? userData.toObject() : null;
            }
            catch (error) {
                console.error("Error in findByEmail:", error);
                return null;
            }
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield UserModel_1.default.findById(_id);
            return userData ? userData.toObject() : null;
        });
    }
    saveOtp(email, otp, name, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const otpDoc = new otpModel_1.default({
                name: name,
                email: email,
                phone: phone,
                password: password,
                otp: otp,
                otpGeneratedAt: new Date(),
            });
            const savedDoc = yield otpDoc.save();
            return savedDoc;
        });
    }
    findOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield otpModel_1.default.findOne({ email })
                    .sort({ otpGeneratedAt: -1 })
                    .exec();
                return otpRecord;
            }
            catch (error) {
                console.error("Error fetching OTP record:", error);
                throw error;
            }
        });
    }
    deleteOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield otpModel_1.default.deleteMany({ email });
        });
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield ClothItemModel_1.default.find();
            return items;
        });
    }
    findCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield CartModel_1.default.findOne({ userId: userId });
            return cart;
        });
    }
    createCart(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Array.isArray(data)) {
                    throw new Error("Data is not an array");
                }
                const newCart = new CartModel_1.default({
                    userId,
                    items: data.map((item) => (Object.assign(Object.assign({}, item), { clothItemId: item.id }))),
                });
                const savedCart = yield newCart.save();
                return savedCart;
            }
            catch (error) {
                console.error("Error occurred while saving cart:", error);
                throw error;
            }
        });
    }
    addtoCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCart = new CartModel_1.default(cart);
            const savedCart = yield newCart.save();
            return savedCart;
        });
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield CartModel_1.default
                .findOne({ userId: userId })
                .populate("items.clothItemId");
            return cart;
        });
    }
    deleteCartItem(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCart = yield CartModel_1.default
                .findOneAndUpdate({ userId }, { $pull: { items: { _id: _id } } }, { new: true })
                .populate("items.clothItemId");
            return updatedCart;
        });
    }
    quantityChange(cartItemId, action, User) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = User;
            const update = action === "increment"
                ? { $inc: { "items.$.quantity": 1 } }
                : { $inc: { "items.$.quantity": -1 } };
            const updatedCart = yield CartModel_1.default
                .findOneAndUpdate({ userId, "items._id": cartItemId }, update, {
                new: true,
            })
                .populate("items.clothItemId");
            return updatedCart;
        });
    }
    findUserAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AddressModel_1.default.findOne({ userId: userId });
            return user;
        });
    }
    createUser(userId, nearBy, street, city, state, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAddress = new AddressModel_1.default({
                userId,
                addresses: [{ nearBy, street, city, state, postalCode }],
            });
            const updatedAddress = yield userAddress.save();
            return updatedAddress;
        });
    }
    saveAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAddres = new AddressModel_1.default(userAddress);
            const address = yield userAddres.save();
            return address;
        });
    }
    getAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield AddressModel_1.default.findOne({ userId: userId });
            return address;
        });
    }
    getDeliveryMode() {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = yield DeliveryModel_1.default.find();
            return mode;
        });
    }
    deleteAddress(_id, User) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield AddressModel_1.default.findOneAndUpdate({ userId: User }, { $pull: { addresses: { _id: _id } } }, { new: true });
            console.log(address);
            return address;
        });
    }
    editAddress(userId, _id, nearBy, street, city, state, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield AddressModel_1.default.findOneAndUpdate({ userId, "addresses._id": _id }, {
                $set: {
                    "addresses.$.nearBy": nearBy,
                    "addresses.$.street": street,
                    "addresses.$.city": city,
                    "addresses.$.state": state,
                    "addresses.$.postalCode": postalCode,
                },
            }, { new: true });
            if (!address) {
                throw new Error("Address not found!");
            }
            return address;
        });
    }
    findOrderUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({ _id: userId });
            return user;
        });
    }
    findOrdercartItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield CartModel_1.default
                .findOne({ userId: userId })
                .populate({
                path: "items.clothItemId",
                select: "name category prices",
            })
                .lean();
            return cart;
        });
    }
    findaddress(userId, selectedAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAddress = (yield AddressModel_1.default.findOne({
                userId: userId,
            }).lean());
            if (!userAddress || !(userAddress === null || userAddress === void 0 ? void 0 : userAddress.addresses[selectedAddress]))
                return null;
            let address = userAddress === null || userAddress === void 0 ? void 0 : userAddress.addresses[selectedAddress];
            return address;
        });
    }
    findagent(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const agents = (yield AgentModel_1.default.find()
                .populate("map")
                .lean());
            let bestAgent = null;
            let maxMatchCount = 0;
            agents.forEach((agent) => {
                var _a, _b, _c, _d, _e, _f;
                if (!agent.map)
                    return;
                const map = agent.map;
                let matchCount = 0;
                if (((_a = map.place) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = address.city) === null || _b === void 0 ? void 0 : _b.toLowerCase()))
                    matchCount++;
                if (map.pincode === address.postalCode)
                    matchCount++;
                if (((_c = map.place) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === ((_d = address.nearBy) === null || _d === void 0 ? void 0 : _d.toLowerCase()) ||
                    ((_e = map.place) === null || _e === void 0 ? void 0 : _e.toLowerCase()) === ((_f = address.street) === null || _f === void 0 ? void 0 : _f.toLowerCase()))
                    matchCount++;
                if (matchCount > maxMatchCount) {
                    maxMatchCount = matchCount;
                    bestAgent = agent;
                }
            });
            return bestAgent;
        });
    }
    CombineAllToOrder(user, cartItems, address, agent, cartTotal, selectedMode, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = cartItems.items.map((item) => {
                var _a;
                return ({
                    clothItemId: item.clothItemId,
                    name: item.clothItemId.name,
                    category: item.clothItemId.category,
                    quantity: item.quantity,
                    service: item.service,
                    unitPrice: (_a = item.clothItemId.prices) === null || _a === void 0 ? void 0 : _a[item.service],
                });
            });
            const addres = {
                nearBy: address.nearBy,
                street: address.street,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
            };
            const newOrder = new OrderModel_1.default({
                userId: new mongoose_1.default.Types.ObjectId(Object(user._id)),
                clothItems: orders,
                addres: addres,
                status: "orderPlaced",
                totalPrice: cartTotal,
                deliveryMode: selectedMode,
                agentId: new mongoose_1.default.Types.ObjectId(Object(agent._id)),
                paymentMethod: paymentMethod,
            });
            const savedOrder = yield newOrder.save();
            return savedOrder;
        });
    }
    clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CartModel_1.default.updateMany({ userId: userId }, { $set: { items: [] } });
        });
    }
    getOrders(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderModel_2.default.find({ userId: _id })
                .populate("userId")
                .populate("agentId")
                .populate({
                path: "clothItems.clothItemId",
                model: "ClothItem",
            });
            return orders;
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserModel_1.default.findOne({ _id: userId });
            return user;
        });
    }
    handleCancelorder(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderModel_2.default.findByIdAndUpdate({ _id: _id }, { status: "cancelled" })
                .populate("userId")
                .populate("agentId")
                .populate({
                path: "clothItems.clothItemId",
                model: "ClothItem",
                select: "name category",
            });
            return orders;
        });
    }
    findAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield AdminModel_1.default.findOne();
            return admin;
        });
    }
    addConcern(id, subject, summary) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !subject || !summary) {
                return "All fields are required";
            }
            const newConcern = new ConcernModel_1.default({
                userId: id,
                subject,
                summary,
            });
            yield newConcern.save();
            return newConcern;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ email });
        });
    }
    SavePassword(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password || !email) {
                return "All fields are required";
            }
            const user = yield UserModel_1.default.findOne({ email: email });
            return user;
        });
    }
}
exports.default = UserRepository;
