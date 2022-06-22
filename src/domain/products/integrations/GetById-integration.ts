import { GetByIdController } from '../controllers/GetById-Controller';
import { GetByIdImplementation } from '../implementations/GetById.implementation';
import { GetByIdUseCase } from '../useCases/GetById-UseCase';

const getByIdImplementation = new GetByIdImplementation();

const getByIdUseCase = new GetByIdUseCase(getByIdImplementation);

export const getByIdController = new GetByIdController(getByIdUseCase);
