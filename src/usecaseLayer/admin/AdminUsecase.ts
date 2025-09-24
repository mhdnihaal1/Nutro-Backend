import mongoose, { Schema, Document, Model } from "mongoose";
import AdminRepository from "../../infrastructureLayer/repository/admin/AdminRepository";
import EncryptPassword from "../../infrastructureLayer/services/bcrypt-password";
import JWTToken from "../../infrastructureLayer/services/generate-token";
import IAdmin from "../../domainLayer/adminDomain";
import IMap from "../../domainLayer/mapDomain";
import IClothItem from "../../domainLayer/ClothItemDomain";
import IOffer from "../../domainLayer/OfferDomain";
import IPrice from "../../domainLayer/ClothItemPriceDomain";
import sendOtp from "../../infrastructureLayer/services/send-email";

class AdminUsecase {
  private AdminRepository: AdminRepository;
  private EncryptPassword: EncryptPassword;
  private JwtToken: JWTToken;
  private generateEmail: sendOtp;

  constructor(
    AdminRepository: AdminRepository,
    EncryptPassword: EncryptPassword,
    jwtToken: JWTToken,
    generateEmail: sendOtp
  ) {
    this.AdminRepository = AdminRepository;
    this.EncryptPassword = EncryptPassword;
    this.JwtToken = jwtToken;
    this.generateEmail = generateEmail;
  }

  async AddAdmin(name: string, email: string, password: string, phone: string) {
    const hashedPassword = await this.EncryptPassword.encryptPassword(password);

    const admin = {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    };
    const newAdmin = {
      ...admin,
      _id: new mongoose.Types.ObjectId().toString(),
      phone: Number(admin.phone),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const saved = await this.AdminRepository.AddAdmin(newAdmin);
    if (saved?.status !== 409) {
      return {
        success: true,
        status: 200,
        data: {
          data: saved,
          status: true,
          message: "Admin created successfully",
        },
      };
    } else {
      return {
        success: false,
        status: saved?.status,
        data: {
          status: saved?.data?.status,
          message: saved?.data?.message,
        },
      };
    }
  }

  async Login(email: string, password: string) {
    const admin = await this.AdminRepository.findByEmail(email);
    let token = "";

    if (admin) {
      let data = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      };

      const passwordMatch = await this.EncryptPassword.compare(
        password,
        admin.password
      );

      if (passwordMatch) {
        token = this.JwtToken.generateToken(data._id, "admin");
        console.log("token",token)

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

  async addAgent(
    name: string,
    email: string,
    password: string,
    phone: string,
    map: string
  ) {
    const hashedPassword = await this.EncryptPassword.encryptPassword(password);
    const agent = {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      map: new mongoose.Types.ObjectId(map),
    };
    const newAgent = {
      ...agent,
      _id: new mongoose.Types.ObjectId(),
      phone: Number(agent.phone),
      agentStatus: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const saved = await this.AdminRepository.AddAgent(newAgent);
    if (saved?.status !== 409) {
      return {
        success: true,
        status: 200,
        data: {
          data: saved,
          status: true,
          message: "Agent created successfully",
        },
      };
    } else {
      return {
        success: false,
        status: saved?.status,
        data: {
          status: saved?.data?.status,
          message: saved?.data?.message,
        },
      };
    }
  }

  async addMap(
    sl_no: number,
    place: string,
    pincode: number,
    latitude_longitude: [number, number]
  ) {
    try {
      console.log(12)

      const newMap: IMap = {
        sl_no: sl_no,
        place: place,
        pincode: pincode,
        latitude_longitude: latitude_longitude,
        _id: new mongoose.Types.ObjectId().toString(),  
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const saved = await this.AdminRepository.AddMap(newMap);

      if (saved?.status !== 409) {
        return {
          success: true,
          status: 200,
          data: {
            data: saved,
            status: true,
            message: "Map created successfully",
          },
        };
      } else {
        return {
          success: false,
          status: saved?.status,
          data: {
            status: saved?.data?.status,
            message: saved?.data?.message,
          },
        };
      }
    } catch (error) {
      console.error("Error in addMap:", error);
    }
  }

  async addClothItem(
    name: string,
    category: string,
    icon: [number],
    prices: IPrice
  ) {
    try {
      const newClothItem: IClothItem = {
        name: name,
        category: category,
        icon: icon,
        prices: prices,
        _id: new mongoose.Types.ObjectId().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const saved = await this.AdminRepository.AddClothItem(newClothItem);

      if (saved?.status !== 409) {
        return {
          success: true,
          status: 200,
          data: {
            data: saved,
            status: true,
            message: "Clothitem created successfully",
          },
        };
      } else {
        return {
          success: false,
          status: saved?.status,
          data: {
            status: saved?.data?.status,
            message: saved?.data?.message,
          },
        };
      }
    } catch (error) {
      console.error("Error in addClothItem:", error);
    }
  }

  async addOffer(
    name: string,
    price: number,
    expirationDate: Date,
    isActive: boolean
  ) {
    try {
      const newOffer: IOffer = {
        name: name,
        price: price,
        expirationDate: expirationDate,
        isActive: isActive,
        _id: new mongoose.Types.ObjectId().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const saved = await this.AdminRepository.AddOffer(newOffer);

      if (saved?.status !== 409) {
        return {
          success: true,
          status: 200,
          data: {
            data: saved,
            status: true,
            message: "Offer created successfully",
          },
        };
      } else {
        return {
          success: false,
          status: saved?.status,
          data: {
            status: saved?.data?.status,
            message: saved?.data?.message,
          },
        };
      }
    } catch (error) {
      console.error("Error in addOffer:", error);
    }
  }

  async addDeliveryMode(mode: string, rate: number) {
    try {
      const saved = await this.AdminRepository.addDeliveryMode(mode, rate);

      if (saved?.status !== 409) {
        return {
          success: true,
          status: 200,
          data: {
            data: saved,
            status: true,
            message: "DeliveryMode created successfully",
          },
        };
      } else {
        return {
          success: false,
          status: saved?.status,
          data: {
            status: saved?.data?.status,
            message: saved?.data?.message,
          },
        };
      }
    } catch (error) {
      console.error("Error in addOffer:", error);
    }
  }

  async getAgents() {
    const result = await this.AdminRepository.getAgents();
    return result;
  }

  async getMaps() {
    const result = await this.AdminRepository.getMaps();
    return result;
  }

  async getOneMap(mapplace: string) {
    const result = await this.AdminRepository.getOneMap(mapplace);
    return result;
  }

  async getItems() {
    const result = await this.AdminRepository.getItems();
    return result;
  }

  async getOffers() {
    const result = await this.AdminRepository.getOffers();
    return result;
  }

  async getOrders() {
    const result = await this.AdminRepository.getOrders();
    return result;
  }

  async getUsers() {
    const result = await this.AdminRepository.getUsers();
    return result;
  }

  async deleteOneMap(id: string) {
    const result = await this.AdminRepository.deleteOneMap(id);
    return result;
  }

  async EditOneMap(
    _id: string,
    sl_no: string,
    place: string,
    pincode: string,
    latitude_longitude: [number, number]
  ) {
    const result = await this.AdminRepository.EditOneMap(
      _id,
      sl_no,
      place,
      pincode,
      latitude_longitude
    );
    return result;
  }

  async deleteOneItem(id: string) {
    const result = await this.AdminRepository.deleteOneItem(id);
    return result;
  }

  async deleteOneOffer(id: string) {
    const result = await this.AdminRepository.deleteOneOffer(id);
    return result;
  }

  async userStatus(id: string) {
    const result = await this.AdminRepository.userStatus(id);

    return result;
  }

  async agentStatus(id: string) {
    const result = await this.AdminRepository.agentStatus(id);

    return result;
  }

  async editAgent(
    _id: string,
    name: string,
    email: string,
    password: string,
    phone: number,
    map: string
  ) {
    const hashedPassword = await this.EncryptPassword.encryptPassword(password);
console.log(123,hashedPassword)
    const result = await this.AdminRepository.editAgent(
      _id,
      name,
      email,
      hashedPassword,
      phone,
      map
    );
    return result;
  }

  async editClothItem(
    _id: string,
    name: string,
    category: string,
    icon: [number],
    prices: IPrice
  ) {
    const result = await this.AdminRepository.editClothItem(
      _id,
      name,
      category,
      icon,
      prices
    );
    return result;
  }

  async editOffer(
    _id: string,
    name: string,
    price: number,
    expirationDate: Date,
    isActive: boolean
  ) {
    const result = await this.AdminRepository.editOffer(
      _id,
      name,
      price,
      expirationDate,
      isActive
    );
    return result;
  }

  async getConcerns() {
    const result = await this.AdminRepository.getConcerns();
    return result;
  }

  async sendReply(userId: string, replyTextr: string) {
    const user = await this.AdminRepository.getOneUser(userId);
    await this.generateEmail.sendConcernReplyMail(user?.email, replyTextr);

    return "Reply sent successfully!";
  }

  async deleteConcern(concernId: string) {
    const result = await this.AdminRepository.deleteConcern(concernId);

    return result;
  }
}

export default AdminUsecase;
