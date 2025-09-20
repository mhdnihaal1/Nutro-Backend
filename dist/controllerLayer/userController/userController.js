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
class userController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, password, email } = req.body;
                if (!name || !phone || !password || !email) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing required fields.",
                    });
                }
                const userExist = yield this.userUseCase.checkExist(email);
                if (userExist.success == false) {
                    return res.status(400).json({
                        success: userExist.success,
                        message: userExist.data.message,
                        data: userExist,
                    });
                }
                const savedUser = yield this.userUseCase.signup(name, email, phone, password);
                if (savedUser && savedUser.status == 200) {
                    return res.status(200).json({
                        success: true,
                        message: savedUser.data.message,
                        data: savedUser,
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp, email } = req.body;
                let Otp = otp === null || otp === void 0 ? void 0 : otp.otp;
                let Email = email === null || email === void 0 ? void 0 : email.email;
                if (typeof Email !== "string" || typeof Otp !== "number") {
                    return res.status(400).json({ message: "Invalid email or OTP format" });
                }
                const verify = yield this.userUseCase.verifyOtp(Email, Otp);
                if (verify && (verify === null || verify === void 0 ? void 0 : verify.status) == 400) {
                    return res.status(400).json({
                        success: false,
                        message: verify === null || verify === void 0 ? void 0 : verify.message,
                        data: verify === null || verify === void 0 ? void 0 : verify.data,
                    });
                }
                if (verify && (verify === null || verify === void 0 ? void 0 : verify.status) == 200) {
                    return res.status(200).json({
                        success: true,
                        message: verify === null || verify === void 0 ? void 0 : verify.message,
                        data: verify === null || verify === void 0 ? void 0 : verify.data,
                    });
                }
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
                const user = yield this.userUseCase.Login(email, password);
                return res.status(200).json(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getItems(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUseCase.getItems();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addtocart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                //  if (!userId || !service || !items) {
                //   return res.status(400).json({
                //     success: false,
                //     message: 'Missing required fields.',
                //   });
                // }
                const addedToCart = yield this.userUseCase.manageAddToCart(data);
                if (addedToCart) {
                    return res.status(200).json({
                        success: true,
                        message: "Items added to cart",
                        data: addedToCart,
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: "Failed adding to cart. Please try again.",
                });
                //  return res.status(200).json({
                //   success: user.status,
                //   message: user?.data?.message,
                //   data: user?.data
                // });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.User;
                const response = yield this.userUseCase.getCart(userId);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCartItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartItemId, userId } = req.body;
                const response = yield this.userUseCase.deleteCartItem(cartItemId, userId);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    quantityChange(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartItemId, action, User } = req.body;
                const response = yield this.userUseCase.quantityChange(cartItemId, action, User);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    AddAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, nearBy, street, city, state, postalCode } = req.body;
                let userAddress = yield this.userUseCase.findUserAddress(userId);
                if (!userAddress) {
                    userAddress = yield this.userUseCase.createUser(userId, nearBy, street, city, state, postalCode);
                }
                else {
                    yield userAddress.addresses.push({
                        nearBy,
                        street,
                        city,
                        state,
                        postalCode,
                    });
                }
                const updatedAddress = yield this.userUseCase.saveAddress(userAddress);
                return res.status(200).json(updatedAddress);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.User;
                const response = yield this.userUseCase.getAddress(userId);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getDeliveryMode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUseCase.getDeliveryMode();
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, User } = req.body;
                const response = yield this.userUseCase.deleteAddress(_id, User);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, _id, nearBy, street, city, state, postalCode } = req.body;
                const response = yield this.userUseCase.editAddress(userId, _id, nearBy, street, city, state, postalCode);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    placeOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, selectedAddress, cartTotal, selectedMode, paymentMethod } = req.body;
                const response = yield this.userUseCase.placeOrder(userId, selectedAddress, cartTotal, selectedMode, paymentMethod);
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
                const { _id } = req.body;
                const response = yield this.userUseCase.getOrders(_id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, currentPassword, newPassword } = req.body;
                const response = yield this.userUseCase.changePassword(_id, currentPassword, newPassword);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    handleCancelorder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const response = yield this.userUseCase.handleCancelorder(id);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendConcern(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, subject, summary } = req.body;
                const response = yield this.userUseCase.addConcern(id, subject, summary);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                const response = yield this.userUseCase.sendEmail(email, otp);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    SavePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email } = req.body;
                const response = yield this.userUseCase.SavePassword(password, email);
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = userController;
