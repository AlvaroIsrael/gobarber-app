import {Router} from 'express';
import appointmentRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);

export default routes;
