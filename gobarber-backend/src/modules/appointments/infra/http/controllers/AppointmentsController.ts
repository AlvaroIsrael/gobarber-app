import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { StatusCodes } from 'http-status-codes';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      providerId: provider_id,
      userId: user_id,
    });

    return response.status(StatusCodes.OK).json(appointment);
  }
}

export default AppointmentsController;
