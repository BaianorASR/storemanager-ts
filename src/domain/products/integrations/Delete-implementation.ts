import { DeleteController } from '../controllers/Delete-Controller';
import { DeleteImplementation } from '../implementations/Delete-implementation';
import { DeleteUseCase } from '../useCases/Delete-UseCase';

const implementation = new DeleteImplementation();
const useCase = new DeleteUseCase(implementation);
export const deleteController = new DeleteController(useCase);
