import { Request, Response, NextFunction } from "express";
import UserUseCase from "../../usecaseLayer/user/UserUsecase";

class userController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, password, email } = req.body;

      if (!name || !phone || !password || !email) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields.",
        });
      }

      const userExist = await this.userUseCase.checkExist(email);

      if (userExist.success == false) {
        return res.status(400).json({
          success: userExist.success,
          message: userExist.data.message,
          data: userExist,
        });
      }

      const savedUser = await this.userUseCase.signup(
        name,
        email,
        phone,
        password
      );
      if (savedUser && savedUser.status == 200) {
        return res.status(200).json({
          success: true,
          message: savedUser.data.message,
          data: savedUser,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp, email } = req.body;
      let Otp = otp?.otp;
      let Email = email?.email;
      if (typeof Email !== "string" || typeof Otp !== "number") {
        return res.status(400).json({ message: "Invalid email or OTP format" });
      }

      const verify = await this.userUseCase.verifyOtp(Email, Otp);

      if (verify && verify?.status == 400) {
        return res.status(400).json({
          success: false,
          message: verify?.message,
          data: verify?.data,
        });
      }
      if (verify && verify?.status == 200) {
        return res.status(200).json({
          success: true,
          message: verify?.message,
          data: verify?.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.userUseCase.Login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userUseCase.getItems();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async addtocart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      //  if (!userId || !service || !items) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Missing required fields.',
      //   });
      // }
      const addedToCart = await this.userUseCase.manageAddToCart(data);
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
    } catch (error) {
      console.log(error);
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.User as string;
      const response = await this.userUseCase.getCart(userId);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId, userId } = req.body;
      const response = await this.userUseCase.deleteCartItem(
        cartItemId,
        userId
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async quantityChange(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartItemId, action, User } = req.body;
      const response = await this.userUseCase.quantityChange(
        cartItemId,
        action,
        User
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async AddAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, nearBy, street, city, state, postalCode } = req.body;

      let userAddress = await this.userUseCase.findUserAddress(userId);

      if (!userAddress) {
        userAddress = await this.userUseCase.createUser(
          userId,
          nearBy,
          street,
          city,
          state,
          postalCode
        );
      } else {
        await userAddress.addresses.push({
          nearBy,
          street,
          city,
          state,
          postalCode,
        });
      }
      const updatedAddress = await this.userUseCase.saveAddress(userAddress);
      return res.status(200).json(updatedAddress);
    } catch (error) {
      console.log(error);
    }
  }

  async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query.User as string;
      const response = await this.userUseCase.getAddress(userId);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getDeliveryMode(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userUseCase.getDeliveryMode();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, User } = req.body;
      const response = await this.userUseCase.deleteAddress(_id, User);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, _id, nearBy, street, city, state, postalCode } = req.body;
      const response = await this.userUseCase.editAddress(
        userId,
        _id,
        nearBy,
        street,
        city,
        state,
        postalCode
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async placeOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, selectedAddress, cartTotal, selectedMode , paymentMethod } = req.body;
      const response = await this.userUseCase.placeOrder(
        userId,
        selectedAddress,
        cartTotal,
        selectedMode,
        paymentMethod
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.body;
      const response = await this.userUseCase.getOrders(_id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, currentPassword, newPassword } = req.body;
      const response = await this.userUseCase.changePassword(
        _id,
        currentPassword,
        newPassword
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async handleCancelorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.userUseCase.handleCancelorder(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async sendConcern(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, subject, summary } = req.body;
      const response = await this.userUseCase.addConcern(id, subject, summary);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const response = await this.userUseCase.sendEmail( email, otp);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  

  async SavePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
      const response = await this.userUseCase.SavePassword( password, email);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default userController;
