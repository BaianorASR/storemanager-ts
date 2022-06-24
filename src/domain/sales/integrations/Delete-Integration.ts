import { DeleteSalesController } from '../controllers/Delete-Controller';
import { DeleteSalesImplementation } from '../implementations/Delete-Implementation';
import { DeleteSalesUseCase } from '../useCases/Delete-UseCase';

const implementation = new DeleteSalesImplementation();
const useCase = new DeleteSalesUseCase(implementation);
export const deleteSalesController = new DeleteSalesController(useCase);
