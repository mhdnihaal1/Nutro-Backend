interface IAdmin {
  _id: string;
  name: string;
  phone: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IAdmin;
