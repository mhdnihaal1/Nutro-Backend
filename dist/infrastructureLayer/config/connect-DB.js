"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongo_uri = process.env.MONGO_URL ||
            "mongodb+srv://mhdnihal:12345@cluster1.jpsjsgj.mongodb.net/Nutro-App?retryWrites=true&w=majority&appName=Cluster1";
        if (mongo_uri) {
            yield mongoose_1.default.connect(mongo_uri);
        }
    }
    catch (error) {
        const err = error;
        console.log("Error connecting to MongoDB :", err);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
