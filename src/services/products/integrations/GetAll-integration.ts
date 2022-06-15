import { GetAllController } from '../controllers/GetAll-Controller';
import { GetAllImplementation } from '../implementations/GetAll-implementation';
import { GetAllUseCase } from '../useCases/GetAll-UseCase';

const getAllImplementation = new GetAllImplementation();

const getAllUseCase = new GetAllUseCase(getAllImplementation);

export const getAllController = new GetAllController(getAllUseCase);
