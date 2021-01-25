import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';

export default interface IUsersRepository {
  create(data: ICreateUserDto): Promise<User>;

  save(user: User): Promise<User>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;
}
