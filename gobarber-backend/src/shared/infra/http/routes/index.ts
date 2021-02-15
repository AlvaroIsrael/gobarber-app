import express, { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import uploadConfig from '@config/upload';

const routes = Router();

routes.use('/api/v1/files', express.static(uploadConfig.uploadsFolder));
routes.use('/api/v1/appointments', appointmentsRouter);
routes.use('/api/v1/users', usersRouter);
routes.use('/api/v1/sessions', sessionsRouter);
routes.use('/api/v1/password', passwordRouter);

export default routes;
