import { CreateController } from '../controllers/Create-Controller';
import { CreateImplementation } from '../implementations/Create-Implementation';
import { CreateUseCase } from '../useCases/Create';

const implementation = new CreateImplementation();
const useCase = new CreateUseCase(implementation);
export const createController = new CreateController(useCase);
