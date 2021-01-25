import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
