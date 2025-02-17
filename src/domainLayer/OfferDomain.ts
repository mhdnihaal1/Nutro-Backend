interface IOffer {
  _id?: Object;
  name: string;
  price: number;
  expirationDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IOffer;
