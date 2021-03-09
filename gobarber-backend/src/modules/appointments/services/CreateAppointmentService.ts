import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getHours, isBefore, startOfHour, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
  }

  public async execute({ date, providerId, userId }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can\'t create an appointment on a past date.', StatusCodes.NOT_FOUND);
    }

    if (userId === providerId) {
      throw new AppError('You can\'t create an appointment with yourself.', StatusCodes.NOT_FOUND);
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('', StatusCodes.NOT_FOUND);
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      providerId,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', StatusCodes.NOT_FOUND);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: providerId,
      date: appointmentDate,
      user_id: userId,
    });

    const dateFormatted = format(appointment.date, 'dd/MM/yyyy \'at\' HH:mm\'h\'');

    await this.notificationsRepository.create({
      recipient_id: providerId,
      content: `New appointment in ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${providerId}:${format(appointmentDate, 'yyyy-M-d')}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
