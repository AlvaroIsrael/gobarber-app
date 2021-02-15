import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Not, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async create({ name, email, password }: ICreateUserDto): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }
}

export default UsersRepository;
