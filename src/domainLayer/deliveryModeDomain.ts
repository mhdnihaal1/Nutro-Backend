interface IDeliveryMode extends Document {
  mode: "default" | "express";
  rate: number;
}

export default IDeliveryMode;
