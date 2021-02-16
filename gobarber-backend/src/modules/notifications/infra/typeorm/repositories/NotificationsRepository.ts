import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDto from '@modules/notifications/dtos/ICreateNotificationDto';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    /*'mongo' here refears to ormconfig.json file. It's the non default connection name defined there.*/
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({ recipient_id, content }: ICreateNotificationDto): Promise<Notification> {
    const notification = this.ormRepository.create({ recipient_id, content });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
