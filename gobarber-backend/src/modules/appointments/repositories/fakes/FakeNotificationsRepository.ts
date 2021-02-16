import { ObjectID } from 'mongodb';

import ICreateNotificationDto from '@modules/notifications/dtos/ICreateNotificationDto';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  protected notifications: Notification[] = [];

  public async create({ recipient_id, content }: ICreateNotificationDto): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
