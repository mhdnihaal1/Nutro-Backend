interface IMap {
  _id: Object;
  sl_no: number;
  place: string;
  pincode: number;
  latitude_longitude: [number, number];
  createdAt: Date;
  updatedAt: Date;
}

export default IMap;
