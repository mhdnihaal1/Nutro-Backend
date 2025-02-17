import OTP from "../../usecaseLayer/interface/otp";

class GenerateOtp implements OTP {
    createOtp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
export default GenerateOtp;