import express, { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import uploadConfig from '@config/upload';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const routes = Router();
const swagger = yaml.load('./swagger.yaml');

routes.use('/api/v1/files', express.static(uploadConfig.uploadsFolder));
routes.use('/api/v1/appointments', appointmentsRouter);
routes.use('/api/v1/providers', providersRouter);
routes.use('/api/v1/users', usersRouter);
routes.use('/api/v1/sessions', sessionsRouter);
routes.use('/api/v1/password', passwordRouter);
routes.use('/api/v1/profile', profileRouter);
routes.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swagger));

export default routes;
