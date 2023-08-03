import { type Controller } from '@/shared/contracts/controller';
import {
  type HttpResponse,
  type HttpRequest,
  error,
  type HttpError,
  ok,
} from '@/shared/contracts/http';

import {
  type OutputCreateUserDTO,
  type InputCreateUserDTO,
} from '../../application/dtos/create-user.dtos';
import { type CreateUserUseCase } from '../../domain/usecases/create-user.usecase';

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: HttpRequest<InputCreateUserDTO>,
  ): Promise<HttpResponse<OutputCreateUserDTO | HttpError>> {
    const user = await this.createUserUseCase.create(request.body);

    if (user.isLeft()) {
      return error(user.value, user.value.statusCode);
    }

    return ok(user.value, 201);
  }
}
