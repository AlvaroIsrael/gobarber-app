import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import * as HttpStatus from 'http-status-codes';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/*appointmentsRouter.get('/', async (request, response) => {
 const appointments = await appointmentsRepository.find();
 return response.json(appointments);
 });*/

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    providerId,
  });

  return response.status(HttpStatus.OK).json(appointment);
});


export default appointmentsRouter;
