import TodoViewModel from './TodoViewModel';
import { TodosResultModel } from '../../../data/todo/TodoModels';
import TodoRepository from '../../../data/todo/TodoRepository';
import { BaseView } from '../../../../core/models/BaseViewModel';

export default class TodoViewModelImpl implements TodoViewModel {
  private baseView?: BaseView;
  public todos: TodosResultModel[];
  public loading: boolean;
  public hasError: boolean;
  public error: string;

  private todoRepository: TodoRepository;
  public constructor(todoRepository: TodoRepository) {
    this.todos = [];
    this.loading = false;
    this.error = '';
    this.hasError = false;
    this.todoRepository = todoRepository;
  }

  public onFetch = async () => {
    this.loading = true;
    this.todos = [];
    this.hasError = false;
    this.notifyViewAboutChanges();
    try {
      const jsonData = await this.todoRepository.onFetch();
      this.todos = jsonData;
      this.loading = false;
      this.hasError = false;
      this.notifyViewAboutChanges();
    } catch (err) {
      console.log(err);
      this.hasError = true;
      this.error = 'Check console please';
      this.notifyViewAboutChanges();
    }
  };

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}
