import { TodosResultModel } from './TodoModels';

export default interface TodoRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  onFetch(): Promise<TodosResultModel[]>;
}
