import { startServer } from '../../app';
import { config } from '../config/server.config';
import { sequelize } from '../config/db.config';

const connectToDB = (): void => {
  // Ping database to check for common exception errors.
  sequelize
    .authenticate()
    .then(() => {
      console.info('DB connected successfully!!!!');
      startServer(config.port);
    })
    .catch((error: Error) => {
      console.log('error while connecting to db', error);
    });
};

export default connectToDB;
