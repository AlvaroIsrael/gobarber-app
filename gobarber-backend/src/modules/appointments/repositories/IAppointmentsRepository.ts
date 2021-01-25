import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
