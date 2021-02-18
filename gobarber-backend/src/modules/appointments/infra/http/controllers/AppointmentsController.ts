import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import * as HttpStatus from 'http-status-codes';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { providerId, date } = request.body;
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      providerId,
      userId: user_id,
    });

    return response.status(HttpStatus.OK).json(appointment);
  }
}

export default AppointmentsController;
