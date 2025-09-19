import app, { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connect-DB";

const PORT = process.env.PORT || process.env.MYPORT || 8000; // <-- use Render's PORT

const startServer = async (): Promise<void> => {
  await connectDB();
  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
