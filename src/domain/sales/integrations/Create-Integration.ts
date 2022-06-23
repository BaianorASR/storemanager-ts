import { CreateSalesController } from '../controllers/Create-Controller';
import { CreateSalesImplementation } from '../implementations/Create-Implementation';
import { CreateSalesUseCase } from '../useCases/Create-USeCase';

const implementation = new CreateSalesImplementation();
const useCase = new CreateSalesUseCase(implementation);

export const createSalesController = new CreateSalesController(useCase);
