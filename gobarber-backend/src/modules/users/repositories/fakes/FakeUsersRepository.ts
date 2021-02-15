import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { v4 as uuidv4 } from 'uuid';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.users.find(user => user.id === id);
  }

  public async create({ name, email, password }: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userIndex => userIndex.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default UsersRepository;
