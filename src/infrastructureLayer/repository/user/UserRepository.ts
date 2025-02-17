import IUser from "../../../domainLayer/userDomain";
import IClothItem from "../../../domainLayer/ClothItemDomain";
import clothItemModel from "../../database/ClothItemModel";
import cartModel from "../../database/CartModel";
import ICart from "../../../domainLayer/cartDomain";
import UserModel from "../../database/UserModel";
import UserRepo from "../../../usecaseLayer/interface/user-repo";
import OtpModel from "../../database/otpModel";
import ICartItem from "../../../domainLayer/cartItemsDomain";
import IAddress from "../../../domainLayer/addressDomain";
import IDeliveryMode from "../../../domainLayer/deliveryModeDomain";
import ClothItem from "../../database/ClothItemModel";
import AddressModel from "../../database/AddressModel";
import deliveryModeModel from "../../database/DeliveryModel";
import IAgent from "../../../domainLayer/agentDomain";
import AgentModel from "../../database/AgentModel";
import IMap from "../../../domainLayer/mapDomain";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import Order from "../../database/OrderModel";
import IOrder from "../../../domainLayer/orderDomain";
import IOrderItem from "../../../domainLayer/orderItemDomain";
import OrderModel from "../../database/OrderModel";
import AdminModel from "../../database/AdminModel";
import ConcernNodel from "../../database/ConcernModel";
import IAdmin from "../../../domainLayer/adminDomain";
import IConcern from "../../../domainLayer/concernDomain";
import Concern from "../../database/ConcernModel";

class UserRepository implements UserRepo {
  async AddUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return savedUser.toObject() as IUser;
  }

  async findByEmail(email: string): Promise<IUser | any> {
    try {
      const userData = await UserModel.findOne({ email: email });
      return userData ? (userData.toObject() as IUser) : null;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      return null;
    }
  }

  async findById(_id: string): Promise<IUser | null> {
    const userData = await UserModel.findById(_id);
    return userData ? (userData.toObject() as IUser) : null;
  }

  async saveOtp(
    email: string,
    otp: number,
    name?: string,
    phone?: string,
    password?: string
  ): Promise<any> {
    const otpDoc = new OtpModel({
      name: name,
      email: email,
      phone: phone,
      password: password,
      otp: otp,
      otpGeneratedAt: new Date(),
    });
    const savedDoc = await otpDoc.save();
    return savedDoc;
  }

  async findOtpByEmail(email: string): Promise<any> {
    try {
      const otpRecord = await OtpModel.findOne({ email })
        .sort({ otpGeneratedAt: -1 })
        .exec();
      return otpRecord;
    } catch (error) {
      console.error("Error fetching OTP record:", error);
      throw error;
    }
  }

  async deleteOtpByEmail(email: string): Promise<any> {
    return OtpModel.deleteMany({ email });
  }

  async getItems(): Promise<IClothItem | any> {
    const items = await clothItemModel.find();
    return items;
  }

  async findCart(userId: string): Promise<ICart | any> {
    const cart = await cartModel.findOne({ userId: userId });
    return cart;
  }

  async createCart(userId: string, data: ICartItem[]): Promise<ICart | any> {
    try {
      if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
      }

      const newCart = new cartModel({
        userId,
        items: data.map((item) => ({
          ...item,
          clothItemId: item.id,
        })),
      });

      const savedCart = await newCart.save();

      return savedCart;
    } catch (error) {
      console.error("Error occurred while saving cart:", error);
      throw error;
    }
  }

  async addtoCart(cart: ICart): Promise<ICart | any> {
    const newCart = new cartModel(cart);

    const savedCart = await newCart.save();

    return savedCart;
  }

  async getCart(userId: string): Promise<ICart | any> {
    const cart = await cartModel
      .findOne({ userId: userId })
      .populate("items.clothItemId");

    return cart;
  }

  async deleteCartItem(_id: string, userId: string): Promise<ICart | any> {
    const updatedCart = await cartModel
      .findOneAndUpdate(
        { userId },
        { $pull: { items: { _id: _id } } },
        { new: true }
      )
      .populate("items.clothItemId");

    return updatedCart;
  }

  async quantityChange(
    cartItemId: string,
    action: string,
    User: string
  ): Promise<ICart | any> {
    let userId = User;
    const update =
      action === "increment"
        ? { $inc: { "items.$.quantity": 1 } }
        : { $inc: { "items.$.quantity": -1 } };

    const updatedCart = await cartModel
      .findOneAndUpdate({ userId, "items._id": cartItemId }, update, {
        new: true,
      })
      .populate("items.clothItemId");

    return updatedCart;
  }

  async findUserAddress(userId: string): Promise<IAddress | any> {
    const user = await AddressModel.findOne({ userId: userId });
    return user;
  }

  async createUser(
    userId: string,
    nearBy: string,
    street: string,
    city: string,
    state: string,
    postalCode: string
  ): Promise<IAddress | any> {
    const userAddress = new AddressModel({
      userId,
      addresses: [{ nearBy, street, city, state, postalCode }],
    });
    const updatedAddress = await userAddress.save();
    return updatedAddress;
  }

  async saveAddress(userAddress: any): Promise<IAddress | any> {
    const userAddres = new AddressModel(userAddress);

    const address = await userAddres.save();
    return address;
  }

  async getAddress(userId: string): Promise<IAddress | any> {
    const address = await AddressModel.findOne({ userId: userId });
    return address;
  }

  async getDeliveryMode(): Promise<IDeliveryMode | any> {
    const mode = await deliveryModeModel.find();
    return mode;
  }

  async deleteAddress(_id: string, User: string): Promise<IAddress | any> {
    const address = await AddressModel.findOneAndUpdate(
      { userId: User },
      { $pull: { addresses: { _id: _id } } },
      { new: true }
    );
    console.log(address);
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
  ): Promise<IAddress | any> {
    const address = await AddressModel.findOneAndUpdate(
      { userId, "addresses._id": _id },
      {
        $set: {
          "addresses.$.nearBy": nearBy,
          "addresses.$.street": street,
          "addresses.$.city": city,
          "addresses.$.state": state,
          "addresses.$.postalCode": postalCode,
        },
      },
      { new: true }
    );

    if (!address) {
      throw new Error("Address not found!");
    }

    return address;
  }

  async findOrderUser(userId: string): Promise<IUser | any> {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }

  async findOrdercartItems(userId: string): Promise<ICart | any> {
    const cart = await cartModel
      .findOne({ userId: userId })
      .populate({
        path: "items.clothItemId",
        select: "name category prices",
      })
      .lean();
    return cart;
  }

  async findaddress(
    userId: string,
    selectedAddress: any
  ): Promise<IAddress | any> {
    const userAddress: IAddress = (await AddressModel.findOne({
      userId: userId,
    }).lean()) as IAddress;
    if (!userAddress || !userAddress?.addresses[selectedAddress]) return null;
    let address = userAddress?.addresses[selectedAddress];
    return address;
  }

  async findagent(address: any): Promise<IAgent | null> {
    const agents: (IAgent & { map: IMap })[] = (await AgentModel.find()
      .populate<{ map: IMap }>("map")
      .lean()) as unknown as (IAgent & { map: IMap })[];

    let bestAgent: IAgent | null = null;
    let maxMatchCount = 0;

    agents.forEach((agent) => {
      if (!agent.map) return;

      const map = agent.map;
      let matchCount = 0;

      if (map.place?.toLowerCase() === address.city?.toLowerCase())
        matchCount++;
      if (map.pincode === address.postalCode) matchCount++;

      if (
        map.place?.toLowerCase() === address.nearBy?.toLowerCase() ||
        map.place?.toLowerCase() === address.street?.toLowerCase()
      )
        matchCount++;

      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestAgent = agent;
      }
    });

    return bestAgent;
  }

  async CombineAllToOrder(
    user: IUser,
    cartItems: any,
    address: any,
    agent: IAgent,
    cartTotal: string,
    selectedMode: string,
    paymentMethod:string
  ): Promise<IOrder | any> {
    const orders = cartItems.items.map((item: any) => ({
      clothItemId: item.clothItemId,
      name: item.clothItemId.name,
      category: item.clothItemId.category,
      quantity: item.quantity,
      service: item.service,
      unitPrice: item.clothItemId.prices?.[item.service],
    }));

    const addres = {
      nearBy: address.nearBy,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    };

    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(Object(user._id)),
      clothItems: orders,
      addres: addres,
      status: "orderPlaced",
      totalPrice: cartTotal,
      deliveryMode: selectedMode,
      agentId: new mongoose.Types.ObjectId(Object(agent._id)),
      paymentMethod:paymentMethod
    });

    const savedOrder = await newOrder.save();
    return savedOrder;
  }

  async clearCart(userId: string): Promise<void> {
    await cartModel.updateMany({ userId: userId }, { $set: { items: [] } });
  }

  async getOrders(_id: string): Promise<IOrder | any> {
    const orders = await OrderModel.find({ userId: _id })
      .populate("userId")
      .populate("agentId")
      .populate({
        path: "clothItems.clothItemId",
        model: "ClothItem",
      });
    return orders;
  }

  async findUser(userId: string): Promise<IUser | any> {
    const user = await UserModel.findOne({ _id: userId });
    return user;
  }

  async handleCancelorder(_id: string): Promise<IOrder | any> {
    const orders = await OrderModel.findByIdAndUpdate(
      { _id: _id },
      { status: "cancelled" }
    )
      .populate("userId")
      .populate("agentId")
      .populate({
        path: "clothItems.clothItemId",
        model: "ClothItem",
        select: "name category",
      });
    return orders;
  }

  async findAdmin(): Promise<IAdmin | any> {
    const admin = await AdminModel.findOne();
    return admin;
  }

  async addConcern(
    id: string,
    subject: string,
    summary: string
  ): Promise<IConcern | any> {
    if (!id || !subject || !summary) {
      return "All fields are required";
    }

    const newConcern = new Concern({
      userId: id,
      subject,
      summary,
    });
    await newConcern.save();

    return newConcern;
  }

  async findUserByEmail(email:string): Promise<IUser | any>{
    return await UserModel.findOne({ email }); // Ensure it returns a document

  }
  
  async SavePassword(
    password: string,
    email: string
  ): Promise<IUser | any> {
    if ( !password || !email) {
      return "All fields are required";
    }

  const user = await UserModel.findOne({email:email})


    return user;
  }
}

export default UserRepository;
