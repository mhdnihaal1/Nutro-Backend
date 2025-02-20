interface IUser {
  [x: string]: any;
  _id: Object;
  name: string;
  phone: number;
  email: string;
  password: string;
  userStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
