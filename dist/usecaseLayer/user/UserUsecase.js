"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
class UserUsecase {
    constructor(UserRepository, generateOtp, EncryptPassword, jwtToken, generateEmail) {
        this.UserRepository = UserRepository;
        this.generateOtp = generateOtp;
        this.EncryptPassword = EncryptPassword;
        this.JwtToken = jwtToken;
        this.generateEmail = generateEmail;
    }
    checkExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield this.UserRepository.findByEmail(email);
            if (userExist) {
                return {
                    success: false,
                    status: 400,
                    data: {
                        status: false,
                        message: "User already exists",
                    },
                };
            }
            else {
                return {
                    success: true,
                    status: 400,
                    data: {
                        status: true,
                        message: "User does not exist",
                    },
                };
            }
        });
    }
    signup(name, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = yield this.generateOtp.createOtp();
            const hashedPassword = yield this.EncryptPassword.encryptPassword(password);
            yield this.UserRepository.saveOtp(email, otp, name, phone, hashedPassword);
            yield this.generateEmail.sendMail(email, otp);
            return {
                success: true,
                status: 200,
                data: {
                    status: true,
                    message: "Verification otp sent to your email",
                },
            };
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const sEmail = String(email);
            const otpRecord = yield this.UserRepository.findOtpByEmail(sEmail);
            let data = {
                name: otpRecord.name,
                email: otpRecord.email,
                phone: otpRecord.phone,
                password: otpRecord.password,
            };
            const now = new Date().getTime();
            const otpGeneratedAt = yield new Date(otpRecord.otpGeneratedAt).getTime();
            const otpExpiration = 2 * 60 * 1000;
            if (now - otpGeneratedAt > otpExpiration) {
                yield this.UserRepository.deleteOtpByEmail(email);
                return { status: 400, message: "OTP has expired" };
            }
            if (otpRecord.otp !== otp) {
                return { status: 400, message: "Invalid OTP" };
            }
            yield this.UserRepository.deleteOtpByEmail(email);
            const newUser = Object.assign(Object.assign({}, data), { _id: new mongoose_1.default.Types.ObjectId().toString(), phone: Number(data.phone), userStatus: false, createdAt: new Date(), updatedAt: new Date() });
            const userData = yield this.UserRepository.AddUser(newUser);
            return {
                status: 200,
                message: "User created successfully",
                data: userData,
            };
        });
    }
    Login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findByEmail(email);
            let token = "";
            if (user) {
                let data = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    userStatus: user.userStatus,
                };
                if (user.userStatus) {
                    return {
                        status: 403,
                        data: {
                            status: false,
                            message: "You have been blocked by admin!",
                            token: "",
                        },
                    };
                }
                const passwordMatch = yield this.EncryptPassword.compare(password, user.password);
                if (passwordMatch) {
                    token = yield this.JwtToken.generateToken(data._id.toString(), "user");
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
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.UserRepository.getItems();
            return result;
        });
    }
    manageAddToCart(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = data[0].userId;
            let cart = yield this.UserRepository.findCart(userId);
            if (!cart) {
                cart = yield this.UserRepository.createCart(userId, data);
            }
            for (const item of data) {
                const existingItemIndex = yield cart.items.findIndex((cartItem) => {
                    return (cartItem.clothItemId.toString() == item.id &&
                        cartItem.service === item.service);
                });
                if (existingItemIndex > -1) {
                    cart.items[existingItemIndex].quantity += item.quantity;
                }
                else {
                    const itemIdObj = new mongoose_1.Types.ObjectId(item.id);
                    cart.items.push({
                        clothItemId: itemIdObj,
                        quantity: item.quantity,
                        service: item.service,
                    });
                }
            }
            const cartSaved = yield this.UserRepository.addtoCart(cart);
            return {
                success: true,
                status: 200,
                data: {
                    status: true,
                    message: "Verification otp sent to your email",
                    data: cartSaved,
                },
            };
        });
    }
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.UserRepository.getCart(userId);
            return cart;
        });
    }
    deleteCartItem(_id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedcart = yield this.UserRepository.deleteCartItem(_id, userId);
            return deletedcart;
        });
    }
    quantityChange(cartItemId, action, User) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatecart = yield this.UserRepository.quantityChange(cartItemId, action, User);
            return updatecart;
        });
    }
    findUserAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findUserAddress(userId);
            return user;
        });
    }
    createUser(userId, nearBy, street, city, state, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const createuser = yield this.UserRepository.createUser(userId, nearBy, street, city, state, postalCode);
            return createuser;
        });
    }
    saveAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const save = yield this.UserRepository.saveAddress(userAddress);
            return save;
        });
    }
    getAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.UserRepository.getAddress(userId);
            return address;
        });
    }
    getDeliveryMode() {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = yield this.UserRepository.getDeliveryMode();
            return mode;
        });
    }
    deleteAddress(_id, User) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.UserRepository.deleteAddress(_id, User);
            return address;
        });
    }
    editAddress(userId, _id, nearBy, street, city, state, postalCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.UserRepository.editAddress(userId, _id, nearBy, street, city, state, postalCode);
            return address;
        });
    }
    placeOrder(userId, selectedAddress, cartTotal, selectedMode, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findOrderUser(userId);
            if (!user) {
                return "Failed to place order. User not found.";
            }
            const cartItems = yield this.UserRepository.findOrdercartItems(userId);
            if (!cartItems) {
                return "Failed to place order. Cart not found.";
            }
            const address = yield this.UserRepository.findaddress(userId, selectedAddress);
            if (!address) {
                return "Failed to place order. Address not found.";
            }
            const agent = yield this.UserRepository.findagent(address);
            if (!agent) {
                return "Failed to place order. Agent not found.";
            }
            const combineAllToOrder = yield this.UserRepository.CombineAllToOrder(user, cartItems, address, agent, cartTotal, selectedMode, paymentMethod);
            if (!combineAllToOrder) {
                return "Failed to place order. ";
            }
            yield this.UserRepository.clearCart(userId);
            return combineAllToOrder;
        });
    }
    getOrders(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.UserRepository.getOrders(_id);
            return result;
        });
    }
    changePassword(UserId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findUser(UserId);
            if (!user)
                return "User not found";
            const isMatch = yield this.EncryptPassword.compare(currentPassword, user.password);
            if (!isMatch)
                return "Incorrect current password";
            user.password = yield this.EncryptPassword.encryptPassword(newPassword);
            yield user.save();
            return user;
        });
    }
    handleCancelorder(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.UserRepository.handleCancelorder(_id);
            yield this.generateEmail.sendCancelMail(order.userId.email);
            return order;
        });
    }
    addConcern(id, subject, summary) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.UserRepository.findAdmin();
            const concern = yield this.UserRepository.addConcern(id, subject, summary);
            yield this.generateEmail.sendMailtoadmin(admin === null || admin === void 0 ? void 0 : admin.email);
            return concern;
        });
    }
    sendEmail(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.generateEmail.forgetPassword(email, otp);
            return "email sended to user for forget password";
        });
    }
    SavePassword(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.UserRepository.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const hashedPassword = yield this.EncryptPassword.encryptPassword(password);
            user.password = hashedPassword;
            yield user.save();
            return { message: "Password updated successfully" };
        });
    }
}
exports.default = UserUsecase;
