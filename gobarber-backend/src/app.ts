import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

export default app;
