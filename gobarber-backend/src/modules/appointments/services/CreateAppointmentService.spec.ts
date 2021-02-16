import 'reflect-metadata';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment.', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '30C5BE67-58CA-4D2C-A436-3A817E8F62CB',
      userId: '427F09B5-A44B-4BD6-BAA0-1ABA4A7CF1B2',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('30C5BE67-58CA-4D2C-A436-3A817E8F62CB');
  });

  it('should not be able to create two appointments at the same time.', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '30C5BE67-58CA-4D2C-A436-3A817E8F62CB',
      userId: '427F09B5-A44B-4BD6-BAA0-1ABA4A7CF1B2',
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      providerId: 'C23AE5CD-91A1-4459-BC67-08A7E354EC4B',
      userId: '427F09B5-A44B-4BD6-BAA0-1ABA4A7CF1B2',
    })).rejects.toBeInstanceOf(AppError);
  });
});
