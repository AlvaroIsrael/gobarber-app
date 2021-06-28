import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/appointments/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2050, 4, 10, 13),
      providerId: 'provider-id',
      userId: 'user-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2050, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: 'provider-id',
      userId: 'user-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2050, 4, 10, 11),
        providerId: 'provider-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2050, 4, 10, 13),
        providerId: 'user-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2050, 4, 11, 7),
        providerId: 'user-id',
        userId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2050, 4, 11, 18),
        providerId: 'user-id',
        userId: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
