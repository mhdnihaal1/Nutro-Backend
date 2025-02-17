import IPrice from "./ClothItemPriceDomain";

interface IClothItem {
  _id: Object;
  name: string;
  category: string;
  icon: number[];
  prices: IPrice;
  createdAt: Date;
  updatedAt: Date;
}

export default IClothItem;
