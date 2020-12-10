import { TodosResultModel } from '../../../data/todo/TodoModels';
import BaseViewModel from '../../../../core/models/BaseViewModel';

export default interface TodoViewModel extends BaseViewModel {
  data: TodosResultModel[];
  error: string;
  status: string;
  onFetch(): void;
}
