import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

class Message {
  private to: string;
  private body: string;

  constructor(to: string, body: string) {
    this.to = to;
    this.body = body;
  }
}

export default class FakeMailProvider implements IMailProvider {
  protected messages: Message[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    const mailMessage = new Message(to, body);
    this.messages.push(mailMessage);
  }
}
