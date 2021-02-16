import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getHours, isBefore, startOfHour } from 'date-fns';
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

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can\'t create an appointment on a past date.');
    }

    if (userId === providerId) {
      throw new AppError('You can\'t create an appointment with yourself.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appontments between 8am and 5pm.',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', HttpStatus.BAD_REQUEST);
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
