import { httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connect-DB";

const PORT =   8000;

const startServer = async (): Promise<void> => {
  await connectDB();
  const app = httpServer;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
