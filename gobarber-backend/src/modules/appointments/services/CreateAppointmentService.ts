import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import * as HttpStatus from 'http-status-codes';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: IAppointmentsRepository;

  constructor(
    appointmentsRepository: IAppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ date, providerId }: IRequest): Promise<Appointment> {
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
    });

    return appointment;
  }
}

export default CreateAppointmentService;
