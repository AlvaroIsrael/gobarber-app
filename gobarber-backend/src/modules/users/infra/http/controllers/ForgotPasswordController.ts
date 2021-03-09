import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

export default ForgotPasswordController;
