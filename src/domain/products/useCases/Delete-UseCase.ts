import { IDeleteRepository } from '../repositories/Delete-Repository';

export class DeleteUseCase {
  constructor(private readonly repository: IDeleteRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
