import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDto): Promise<User>;

  save(user: User): Promise<User>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}
