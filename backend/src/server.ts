import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import config from './config/config';
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";

const server = app.listen(config.port, () => {
  logger.info(`Server started on port: ${config.port}`);
});

initIO(server);
StartAllWhatsAppsSessions();
gracefulShutdown(server);
