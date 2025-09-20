import app, { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connect-DB";

const PORT = process.env.PORT || 8000; 

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
