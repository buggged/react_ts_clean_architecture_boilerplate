import { TodosResultModel } from '../../../data/todo/TodoModels';
import BaseViewModel from '../../../../core/models/BaseViewModel';

export default interface TodoViewModel extends BaseViewModel {
  todos: TodosResultModel[];
  hasError: boolean;
  error: string;
  loading: boolean;
  onFetch(): void;
}
