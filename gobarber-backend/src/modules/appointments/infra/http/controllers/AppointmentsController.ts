import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import * as HttpStatus from 'http-status-codes';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });

    return response.status(HttpStatus.OK).json(appointment);
  }
}

export default AppointmentsController;
