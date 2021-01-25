import 'reflect-metadata';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment.', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '30C5BE67-58CA-4D2C-A436-3A817E8F62CB',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('30C5BE67-58CA-4D2C-A436-3A817E8F62CB');
  });

  it('should not be able to create two appointments at the same time.', async () => {

  });
});
