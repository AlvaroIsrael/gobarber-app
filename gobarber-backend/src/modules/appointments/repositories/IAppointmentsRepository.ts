import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
