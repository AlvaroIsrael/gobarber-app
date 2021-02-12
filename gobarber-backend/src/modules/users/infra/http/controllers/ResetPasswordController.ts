import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as HttpStatus from 'http-status-codes';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}

export default ResetPasswordController;
