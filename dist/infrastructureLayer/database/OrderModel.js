"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const orderItemSchema = new mongoose_1.Schema({
    clothItemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ClothItem",
        required: true,
    },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    service: {
        type: String,
        enum: ["wash", "dryClean", "iron"],
        required: true,
    },
    unitPrice: { type: Number, required: true },
});
const addressSchema = new mongoose_1.Schema({
    nearBy: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
});
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    clothItems: [orderItemSchema],
    addres: [addressSchema],
    status: {
        type: String,
        enum: [
            "orderPlaced",
            "orderConfirmed",
            "agentAccepted",
            "readyForPickup",
            "itemOnLaundry",
            "itemPacked",
            "outForDelivery",
            "delivered",
            "cancelled",
        ],
        default: "orderPlaced",
    },
    totalPrice: { type: Number, required: true },
    deliveryMode: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    agentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Agent",
        required: true,
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
