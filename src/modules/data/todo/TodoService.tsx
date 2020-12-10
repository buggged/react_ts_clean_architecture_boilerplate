import axiosInstance from '../../../helpers/axiosInterceptor';
import TodoRepository from './TodoRepository';
import { TodosResultModel } from './TodoModels';

export default class TodoService implements TodoRepository {
  onFetch(): Promise<TodosResultModel[]> {
    return axiosInstance.get('https://jsonplaceholder.typicode.com/todos');
  }
}
