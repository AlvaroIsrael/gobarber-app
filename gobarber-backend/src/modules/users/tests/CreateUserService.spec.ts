import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });

  it('should be able to create a new user.', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'E9334650C128',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user using an existing email.', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: 'E9334650C128',
    });

    try {
      await createUserService.execute({
        name: 'Jhon Doe 2',
        email: 'jhondoe@example.com',
        password: '8DE0A7A43771',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
