import TodoViewModel from './TodoViewModel';
import { TodosResultModel } from '../../../data/todo/TodoModels';
import TodoRepository from '../../../data/todo/TodoRepository';
import { BaseView } from '../../../../core/models/BaseViewModel';

export default class TodoViewModelImpl implements TodoViewModel {
  private baseView?: BaseView;
  public data: TodosResultModel[];
  public error: string;
  public status: string;

  private todoRepository: TodoRepository;
  public constructor(todoRepository: TodoRepository) {
    this.data = [];
    this.status = 'idle';
    this.error = '';
    this.todoRepository = todoRepository;
  }

  public onFetch = async () => {
    this.status = 'loading';
    this.data = [];
    this.notifyViewAboutChanges();
    try {
      const jsonData = await this.todoRepository.onFetch();
      this.data = jsonData;
      this.status = 'data';
      this.notifyViewAboutChanges();
    } catch (err) {
      this.status = 'error';
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
