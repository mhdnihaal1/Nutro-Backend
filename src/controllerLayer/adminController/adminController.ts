import { Request, Response, NextFunction } from "express";
import AdminUsecase from "../../usecaseLayer/admin/AdminUsecase";

class adminController {
  private adminUsecase: AdminUsecase;

  constructor(adminUsecase: AdminUsecase) {
    this.adminUsecase = adminUsecase;
  }

  async addAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, phone } = req.body;
      const saved = await this.adminUsecase.AddAdmin(
        name,
        email,
        password,
        phone
      );
      return res.status(200).json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.adminUsecase.Login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  async addAgent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, phone, map } = req.body;
      const m = await this.adminUsecase.getOneMap(map);
      const saved = await this.adminUsecase.addAgent(
        name,
        email,
        password,
        phone,
        m._id
      );
      return res.status(200).json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async addMap(req: Request, res: Response, next: NextFunction) {
    try {
      const { sl_no, place, pincode, latitude_longitude } = req.body;
      const saved = await this.adminUsecase.addMap(
        sl_no,
        place,
        pincode,
        latitude_longitude
      );
      return res.status(200).json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async addClothItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category, icon, prices } = req.body;
      const saved = await this.adminUsecase.addClothItem(
        name,
        category,
        icon,
        prices
      );
      return res.status(200).json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async addOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, expirationDate, isActive } = req.body;
      const saved = await this.adminUsecase.addOffer(
        name,
        price,
        expirationDate,
        isActive
      );
      return res.status(200).json(saved);
    } catch (error) {
      console.log(error);
    }
  }

  async addDeliveryMode(req: Request, res: Response, next: NextFunction) {
    try {
      const { mode, rate } = req.body;
      if (!mode || !rate) {
        return res.status(400).json({ message: "Mode and rate are required." });
      }
      const newDeliveryMode =await this.adminUsecase.addDeliveryMode(mode, rate);
      return res.status(201).json(newDeliveryMode);
    } catch (error) {
      console.log(error);
    }
  }

  async addService(req: Request, res: Response, next: NextFunction) {}

  async getAgents(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getAgents();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getMaps(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getMaps();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getItems();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getOffers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getOffers();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getOrders();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getUsers();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMap(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.adminUsecase.deleteOneMap(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editMap(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, sl_no, place, pincode, latitude_longitude } =
        req.body.newMap;
      const response = await this.adminUsecase.EditOneMap(
        _id,
        sl_no,
        place,
        pincode,
        latitude_longitude
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.adminUsecase.deleteOneItem(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.adminUsecase.deleteOneOffer(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async UserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.adminUsecase.userStatus(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async agentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      const response = await this.adminUsecase.agentStatus(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editAgent(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, name, email, password, phone, map } = req.body;
      const response = await this.adminUsecase.editAgent(
        _id,
        name,
        email,
        password,
        phone,
        map
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editClothItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, name, category, icon, prices } = req.body;
      const response = await this.adminUsecase.editClothItem(
        _id,
        name,
        category,
        icon,
        prices
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editOffer(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, name, price, expirationDate, isActive } = req.body;
      const response = await this.adminUsecase.editOffer(
        _id,
        name,
        price,
        expirationDate,
        isActive
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getConcerns(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.adminUsecase.getConcerns();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async sendReply(req: Request, res: Response, next: NextFunction) {
    try {
      const { concernId, userId, replyTextr } = req.body;

      const response = await this.adminUsecase.sendReply(userId, replyTextr);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteConcern(req: Request, res: Response, next: NextFunction) {
    try {
      const { concernId } = req.body;

      const response = await this.adminUsecase.deleteConcern(concernId);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminController;
