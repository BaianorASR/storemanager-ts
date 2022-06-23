import { UpdateSalesController } from '../controllers/Update-Controller';
import { UpdateSalesImplementation } from '../implementations/Update-Implementation';
import { UpdateSalesUseCase } from '../useCases/Update-UseCase';

const implementation = new UpdateSalesImplementation();
const useCase = new UpdateSalesUseCase(implementation);
export const updateSalesController = new UpdateSalesController(useCase);
