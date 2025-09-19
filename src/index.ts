import app,{ httpServer } from "./infrastructureLayer/config/app";
import { connectDB } from "./infrastructureLayer/config/connect-DB";

const MYPORT = process.env.MYPORT ;

const startServer = async (): Promise<void> => {
  await connectDB(); 
  const app = httpServer;
  app.listen(MYPORT, () => {
    console.log(`Server running on port ${MYPORT}`);
  });
};

startServer();
