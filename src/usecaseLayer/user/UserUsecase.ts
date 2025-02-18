import mongoose, { Schema, Document, Model, Types } from "mongoose";
import UserRepository from "../../infrastructureLayer/repository/user/UserRepository";
import generateOtp from "../../infrastructureLayer/services/generate-otp";
import EncryptPassword from "../../infrastructureLayer/services/bcrypt-password";
import sendOtp from "../../infrastructureLayer/services/send-email";
import JWTToken from "../../infrastructureLayer/services/generate-token";

import IUser from "../../domainLayer/userDomain";
import UserModel from "../../infrastructureLayer/database/UserModel";

class UserUsecase {
  private UserRepository: UserRepository;
  private generateOtp: generateOtp;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private generateEmail: sendOtp;

  constructor(
    UserRepository: UserRepository,
    generateOtp: generateOtp,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    generateEmail: sendOtp
  ) {
    this.UserRepository = UserRepository;
    this.generateOtp = generateOtp;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.generateEmail = generateEmail;
  }

  async checkExist(email: string) {
    const userExist = await this.UserRepository.findByEmail(email);

    if (userExist) {
      return {
        success: false,
        status: 400,
        data: {
          status: false,
          message: "User already exists",
        },
      };
    } else {
      return {
        success: true,
        status: 400,
        data: {
          status: true,
          message: "User does not exist",
        },
      };
    }
  }

  async signup(name: string, email: string, phone: string, password: string) {
    const otp =await this.generateOtp.createOtp();
    const hashedPassword = await this.EncryptPassword.encryptPassword(password);
    await this.UserRepository.saveOtp(email, otp, name, phone, hashedPassword);
    await this.generateEmail.sendMail(email, otp);
    return {
      success: true,
      status: 200,
      data: {
        status: true,
        message: "Verification otp sent to your email",
      },
    };
  }

  async verifyOtp(email: string, otp: number) {
    const sEmail = String(email);
    const otpRecord = await this.UserRepository.findOtpByEmail(sEmail);

    let data: { name: string; email: string; phone: string; password: string } =
      {
        name: otpRecord.name,
        email: otpRecord.email,
        phone: otpRecord.phone,
        password: otpRecord.password,
      };

    const now = new Date().getTime();
    const otpGeneratedAt =await  new Date(otpRecord.otpGeneratedAt).getTime();
    const otpExpiration = 2 * 60 * 1000;

    if (now - otpGeneratedAt > otpExpiration) {
      await this.UserRepository.deleteOtpByEmail(email);
      return { status: 400, message: "OTP has expired" };
    }

    if (otpRecord.otp !== otp) {
      return { status: 400, message: "Invalid OTP" };
    }

    await this.UserRepository.deleteOtpByEmail(email);

    const newUser = {
      ...data,
      _id: new mongoose.Types.ObjectId().toString(),
      phone: Number(data.phone),
      userStatus: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const userData = await this.UserRepository.AddUser(newUser);

    return {
      status: 200,
      message: "User created successfully",
      data: userData,
    };
  }

  async Login(email: string, password: string) {
    const user = await this.UserRepository.findByEmail(email);
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

      const passwordMatch = await this.EncryptPassword.compare(
        password,
        user.password
      );


      if (passwordMatch) {
        token =await  this.JwtToken.generateToken(data._id.toString(), "user");

        return {
          status: 200,
          data: {
            status: true,
            message: data,
            token,
          },
        };
      } else {
        return {
          status: 400,
          data: {
            status: false,
            message: "Invalid email or password",
            token: "",
          },
        };
      }
    } else {
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

  async getItems() {
    const result = await this.UserRepository.getItems();
    return result;
  }

  async manageAddToCart(data: any) {
    const userId = data[0].userId;

    let cart = await this.UserRepository.findCart(userId);
    if (!cart) {
      cart = await this.UserRepository.createCart(userId, data);
    }

    for (const item of data) {
      const existingItemIndex = await cart.items.findIndex((cartItem: any) => {
        return (
          cartItem.clothItemId.toString() == item.id &&
          cartItem.service === item.service
        );
      });

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        const itemIdObj = new Types.ObjectId(item.id);
        cart.items.push({
          clothItemId: itemIdObj,
          quantity: item.quantity,
          service: item.service,
        });
      }
    }

    const cartSaved = await this.UserRepository.addtoCart(cart);

    return {
      success: true,
      status: 200,
      data: {
        status: true,
        message: "Verification otp sent to your email",
        data: cartSaved,
      },
    };
  }

  async getCart(userId: string) {
    const cart = await this.UserRepository.getCart(userId);
    return cart;
  }

  async deleteCartItem(_id: string, userId: string) {
    const deletedcart = await this.UserRepository.deleteCartItem(_id, userId);
    return deletedcart;
  }

  async quantityChange(cartItemId: string, action: string, User: string) {
    const updatecart = await this.UserRepository.quantityChange(
      cartItemId,
      action,
      User
    );
    return updatecart;
  }

  async findUserAddress(userId: string) {
    const user = await this.UserRepository.findUserAddress(userId);
    return user;
  }

  async createUser(
    userId: string,
    nearBy: string,
    street: string,
    city: string,
    state: string,
    postalCode: string
  ) {
    const createuser = await this.UserRepository.createUser(
      userId,
      nearBy,
      street,
      city,
      state,
      postalCode
    );
    return createuser;
  }

  async saveAddress(userAddress: any) {
    const save = await this.UserRepository.saveAddress(userAddress);
    return save;
  }

  async getAddress(userId: string) {
    const address = await this.UserRepository.getAddress(userId);
    return address;
  }

  async getDeliveryMode() {
    const mode = await this.UserRepository.getDeliveryMode();
    return mode;
  }
  async deleteAddress(_id: string, User: string) {
    const address = await this.UserRepository.deleteAddress(_id, User);
    return address;
  }

  async editAddress(
    userId: string,
    _id: string,
    nearBy: string,
    street: string,
    city: string,
    state: string,
    postalCode: string
  ) {
    const address = await this.UserRepository.editAddress(
      userId,
      _id,
      nearBy,
      street,
      city,
      state,
      postalCode
    );
    return address;
  }

  async placeOrder(
    userId: string,
    selectedAddress: string,
    cartTotal: string,
    selectedMode: string,
    paymentMethod: string
  ) {
    const user = await this.UserRepository.findOrderUser(userId);
    if (!user) {
      return "Failed to place order. User not found.";
    }

    const cartItems = await this.UserRepository.findOrdercartItems(userId);
    if (!cartItems) {
      return "Failed to place order. Cart not found.";
    }

    const address = await this.UserRepository.findaddress(
      userId,
      selectedAddress
    );
    if (!address) {
      return "Failed to place order. Address not found.";
    }

    const agent = await this.UserRepository.findagent(address);
    if (!agent) {
      return "Failed to place order. Agent not found.";
    }

    const combineAllToOrder = await this.UserRepository.CombineAllToOrder(
      user,
      cartItems,
      address,
      agent,
      cartTotal,
      selectedMode,
      paymentMethod
    );
    if (!combineAllToOrder) {
      return "Failed to place order. ";
    }
      await this.UserRepository.clearCart(userId);
    
    return combineAllToOrder;
  }

  async getOrders(_id: string) {
    const result = await this.UserRepository.getOrders(_id);
    return result;
  }

  async changePassword(
    UserId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await this.UserRepository.findUser(UserId);
    if (!user) return "User not found";

    const isMatch = await this.EncryptPassword.compare(
      currentPassword,
      user.password
    );
    if (!isMatch) return "Incorrect current password";

    user.password = await this.EncryptPassword.encryptPassword(newPassword);
    await user.save();

    return user;
  }

  async handleCancelorder(_id: string) {
    const order = await this.UserRepository.handleCancelorder(_id);
    await this.generateEmail.sendCancelMail(order.userId.email);

    return order;
  }

  async addConcern(id: string, subject: string, summary: string) {
    const admin = await this.UserRepository.findAdmin();

    const concern = await this.UserRepository.addConcern(id, subject, summary);
    await this.generateEmail.sendMailtoadmin(admin?.email);

    return concern;
  }

  async sendEmail(email: string, otp: string) {

    await this.generateEmail.forgetPassword(email, otp);

    return "email sended to user for forget password";
  }

  async SavePassword(password: string, email: string) {
    const user = await this.UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await this.EncryptPassword.encryptPassword(password);

    user.password = hashedPassword;
    await user.save();

    return { message: "Password updated successfully" };
  }
}

export default UserUsecase;
