import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';
import { v4 as uuidv4 } from 'uuid';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IFindAllInMonthFromProviderDto from '@modules/appointments/dtos/IFindAllInMonthFromProviderDto';
import IFindAllInDayFromProviderDto from '@modules/appointments/dtos/IFindAllInDayFromProviderDto';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => isEqual(appointment.date, date) &&
      appointment.provider_id === provider_id,
    );
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidv4(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
