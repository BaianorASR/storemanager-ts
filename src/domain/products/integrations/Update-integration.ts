import { UpdateController } from '../controllers/Update-Controller';
import { UpdateImplementation } from '../implementations/Update-implentation';
import { UpdateUseCase } from '../useCases/Update-UseCase';

const implementation = new UpdateImplementation();
const useCase = new UpdateUseCase(implementation);
export const updateController = new UpdateController(useCase);
