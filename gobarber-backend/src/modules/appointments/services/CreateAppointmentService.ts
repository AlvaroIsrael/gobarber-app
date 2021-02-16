import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  providerId: string;
  date: Date;
  userId: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {
  }

  public async execute({ date, providerId, userId }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment os already booked', HttpStatus.BAD_REQUEST);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
      user_id: userId,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
