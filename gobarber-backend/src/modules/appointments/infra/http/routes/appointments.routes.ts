import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import * as HttpStatus from 'http-status-codes';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });

  return response.status(HttpStatus.OK).json(appointment);
});


export default appointmentsRouter;
