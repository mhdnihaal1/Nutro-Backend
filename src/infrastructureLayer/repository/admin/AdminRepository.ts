import IAdmin from "../../../domainLayer/adminDomain";
import IAgent from "../../../domainLayer/agentDomain";
import IMap from "../../../domainLayer/mapDomain";
import IClothItem from "../../../domainLayer/ClothItemDomain";
import IOffer from "../../../domainLayer/OfferDomain";
import IDeliveryMode from "../../../domainLayer/deliveryModeDomain";
import adminModel from "../../database/AdminModel";
import agentModel from "../../database/AgentModel";
import mapModel from "../../database/MapModel";
import clothItemModel from "../../database/ClothItemModel";
import offerModel from "../../database/OfferModel";
import DeliveryMode from "../../database/DeliveryModel";
import OrderModel from "../../database/OrderModel";
import UserModel from "../../database/UserModel";
import ConcernModel from "../../database/ConcernModel";
import AdminRepo from "../../../usecaseLayer/interface/admin-repo";
import IOrder from "../../../domainLayer/orderDomain";
import IUser from "../../../domainLayer/userDomain";
import mongoose from "mongoose";
import IPrice from "../../../domainLayer/ClothItemPriceDomain";
import IConcern from "../../../domainLayer/concernDomain";

class UserRepository implements AdminRepo {
  async AddAdmin(admin: IAdmin): Promise<IAdmin | any> {
    const { email } = admin;
    const existUser = await adminModel.findOne({ email: email });

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

    const newAdmin = new adminModel(admin);
    const savedAdmin = await newAdmin.save();
    return savedAdmin.toObject() as IAdmin;
  }

  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      const AdminData = await adminModel.findOne({ email: email });
      return AdminData ? (AdminData.toObject() as IAdmin) : null; // Convert if found
    } catch (error) {
      console.error("Error in findByEmail:", error);
      return null;
    }
  }

  async findById(_id: string): Promise<IAdmin | null> {
    const userData = await adminModel.findById(_id);
    return userData ? (userData.toObject() as IAdmin) : null; // Convert if found
  }

  async AddAgent(agent: IAgent): Promise<IAgent | any> {
    const { email } = agent;

    const existAgent = await agentModel.findOne({ email: email });

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

    const newAgent = new agentModel(agent);
    const savedAgent = await newAgent.save();
        console.log(savedAgent)

    return savedAgent;
  }

  async AddMap(map: IMap): Promise<IMap | any> {
    const { sl_no } = map;
      console.log(13)

    const existMap = await mapModel.findOne({ sl_no: sl_no });
     console.log(existMap);
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
    const newMap = new mapModel(map);
    const savedMap = await newMap.save();
    console.log(savedMap)
    return savedMap;
  }

  async AddClothItem(clothitem: IClothItem): Promise<IClothItem | any> {
    const { name } = clothitem;

    const existClothitem = await clothItemModel.findOne({
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
    const newclothitem = new clothItemModel(clothitem);
    const savedclothitem = await newclothitem.save();
    return savedclothitem;
  }

  async AddOffer(offer: IOffer): Promise<IOffer | any> {
    const { name } = offer;

    const existOffer = await offerModel.findOne({
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

    const newoffer = new offerModel(offer);
    const savedoffer = await newoffer.save();
    return savedoffer;
  }

  async addDeliveryMode(
    mode: string,
    rate: number
  ): Promise<IDeliveryMode | any> {
    try {
      const existMode = await DeliveryMode.findOne({ mode: mode });

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

      const newDeliveryMode = new DeliveryMode({ mode, rate });

      const saved = await newDeliveryMode.save();
      return saved;
    } catch (error) {
      console.log(error);
    }
  }

  async getAgents(): Promise<IAgent | any> {
    const agents = await agentModel.find().populate("map");
    return agents;
  }

  async getMaps(): Promise<IMap | any> {
    const maps = await mapModel.find();
    return maps;
  }

  async getOneMap(mapplace: string): Promise<IMap | any> {
    const map = await mapModel.findOne({ place: mapplace });
    return map;
  }

  async getItems(): Promise<IClothItem | any> {
    const items = await clothItemModel.find();
    return items;
  }

  async getOffers(): Promise<IOffer | any> {
    const offers = await offerModel.find();
    return offers;
  }

  async getOrders(): Promise<IOrder | any> {
    const orders = await OrderModel.find()
      .populate("userId")
      .populate("agentId")
      .populate({
        path: "clothItems.clothItemId",
        model: "ClothItem",
      });
    return orders;
  }

  async getUsers(): Promise<IUser | any> {
    const users = await UserModel.find();

    return users;
  }

  async deleteOneMap(id: string): Promise<IMap | any> {
    const users = await mapModel.findOneAndDelete({ _id: id });

    return users;
  }

  async EditOneMap(
    _id: string,
    sl_no: string,
    place: string,
    pincode: string,
    latitude_longitude: [number, number]
  ): Promise<IMap | any> {
    const result = await mapModel.findOneAndUpdate(
      { _id: _id },
      {
        sl_no,
        place,
        pincode,
        latitude_longitude,
      },
      { new: true }
    );
    return result;
  }

  async deleteOneItem(id: string): Promise<IClothItem | any> {
    const users = await clothItemModel.findOneAndDelete({ _id: id });

    return users;
  }

  async deleteOneOffer(id: string): Promise<IOffer | any> {
    const users = await offerModel.findOneAndDelete({ _id: id });

    return users;
  }

  async userStatus(id: string): Promise<IUser | any> {

    const user = (await UserModel.findOne({ _id: id })) as IUser;

    if (user) {
      user.userStatus = !user.userStatus;

      await user.save();
    }

    return user;
  }

  async agentStatus(id: string): Promise<IAgent | null> {
    const agent = await agentModel.findOne({ _id: id }) as IAgent;

    if (!agent) {
        throw new Error("Agent not found");
    }

    agent.agentStatus = !agent.agentStatus;

    await agent.save();

    return await agentModel.findById(id);
}


  async editAgent(
    _id: string,
    name: string,
    email: string,
    password: string,
    phone: number,
    map: string
  ): Promise<IAgent | any> {
    const updateData: Partial<IAgent> = { name, email, password, phone };
console.log(123,_id,password)
    if (map) {
      updateData.map = new mongoose.Types.ObjectId(map);
    }

    const result = await agentModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
      runValidators: true,
    });
    console.log(123,result)

    return result;
  }

  async editClothItem(
    _id: string,
    name: string,
    category: string,
    icon: [number],
    prices: IPrice
  ): Promise<IClothItem | any> {
    const updateData: Partial<IClothItem> = { name, category, icon, prices };

    const result = await clothItemModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
      runValidators: true,
    });

    return result;
  }

  async editOffer(
    _id: string,
    name: string,
    price: number,
    expirationDate: Date,
    isActive: boolean
  ): Promise<IOffer | any> {
    const updateData: Partial<IOffer> = {
      name,
      price,
      expirationDate,
      isActive,
    };

    const result = await offerModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
      runValidators: true,
    });

    return result;
  }

  async getConcerns(): Promise<IConcern | any> {
    const concerns = await ConcernModel.find().populate("userId");

    return concerns;
  }

  async getOneUser(userId: string): Promise<IUser | any> {
    const user = await UserModel.findOne({ _id: userId });

    return user;
  }

  async deleteConcern(concernId: string): Promise<IConcern | any> {
    const res = await ConcernModel.findOneAndDelete({ _id: concernId });

    return res;
  }
}

export default UserRepository;
