import { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connect-DB";

const PORT = process.env.MYPORT;

const startServer = async (): Promise<void> => {
  await connectDB();
  const app = httpServer;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
