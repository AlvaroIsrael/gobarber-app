import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthFromProviderDto from '@modules/appointments/dtos/IFindAllInMonthFromProviderDto';
import IFindAllInDayFromProviderDto from '@modules/appointments/dtos/IFindAllInDayFromProviderDto';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDto): Promise<Appointment[]>;

  findAllInDayFromProvider(data: IFindAllInDayFromProviderDto): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
