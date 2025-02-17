import IUser from "../../../domainLayer/userDomain";
import IClothItem from "../../../domainLayer/ClothItemDomain";
import clothItemModel from "../../database/ClothItemModel";
import cartModel from "../../database/CartModel";
import ICart from "../../../domainLayer/cartDomain";
import UserModel from "../../database/UserModel";
import AgentRepo from "../../../usecaseLayer/interface/agent-repo";
import OtpModel from "../../database/otpModel";
import ICartItem from "../../../domainLayer/cartItemsDomain";
import IAddress from "../../../domainLayer/addressDomain";
import IDeliveryMode from "../../../domainLayer/deliveryModeDomain";
import ClothItem from "../../database/ClothItemModel";
import AddressModel from "../../database/AddressModel";
import deliveryModeModel from "../../database/DeliveryModel";
import AgentModel from "../../database/AgentModel";
import IMap from "../../../domainLayer/mapDomain";
import mongoose from "mongoose";
import Order from "../../database/OrderModel";
import IOrder from "../../../domainLayer/orderDomain";
import IOrderItem from "../../../domainLayer/orderItemDomain";
import IAgent from "../../../domainLayer/agentDomain";
import agentModel from "../../database/AgentModel";
import MapModel from "../../database/MapModel";
import OrderModel from "../../database/OrderModel";

class AgentRepository implements AgentRepo {
  async findByEmail(email: string): Promise<IAgent | null> {
    try {
      const AgentData = await agentModel.findOne({ email: email });

      return AgentData ? (AgentData.toObject() as IAgent) : null;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      return null;
    }
  }

  async findOrders(agentId: string): Promise<IOrder | any> {
    try {
      const orders = await OrderModel.find({ agentId: agentId })
        .populate("userId")
        .populate("agentId")
        .populate({
          path: "clothItems.clothItemId",
          model: "ClothItem",
          select: "name category",
        });
      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async agentAccept(id: string): Promise<IOrder | any> {
    try {
      const orders = await OrderModel.findByIdAndUpdate(
        { _id: id },
        { status: "agentAccepted" }
      )
        .populate("userId")
        .populate("agentId")
        .populate({
          path: "clothItems.clothItemId",
          model: "ClothItem",
          select: "name category",
        });
      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async agentDeliveredOrder(id: string): Promise<IOrder | any> {
    try {
      const orders = await OrderModel.findByIdAndUpdate(
        { _id: id },
        { status: "delivered" }
      )
        .populate("userId")
        .populate("agentId")
        .populate({
          path: "clothItems.clothItemId",
          model: "ClothItem",
          select: "name category",
        });
      return orders;
    } catch (error) {
      console.log(error);
    }
  }

  async agent(id: string): Promise<IAgent | any> {
    try {
      const agent = await AgentModel.findOne({ _id: id });

      return agent;
    } catch (error) {
      console.log(error);
    }
  }

  async getMapData(id: string): Promise<IAgent | any> {
    try {
      const agent = await AgentModel.findOne({ _id: id }).populate("map");

      return agent;
    } catch (error) {
      console.log(error);
    }
  }

  async newPassword(id: string, hash: string): Promise<IAgent | any> {
    try {
      const agent = await AgentModel.findOneAndUpdate(
        { _id: id },
        { password: hash }
      );

      return agent;
    } catch (error) {
      console.log(error);
    }
  }
}

export default AgentRepository;
