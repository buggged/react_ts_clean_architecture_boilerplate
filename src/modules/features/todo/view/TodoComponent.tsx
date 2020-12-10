import React from 'react';
import { TodosResultModel } from '../../../data/todo/TodoModels';
import TodoViewModel from '../view_model/TodoViewModel';
import { BaseView } from '../../../../core/models/BaseViewModel';
import TodoListItem from '../components/TodoListItem';

export interface TodoComponentProps {
  todoViewModel: TodoViewModel;
}

export interface TodoComponentState {
  data: TodosResultModel[];
  error: string;
  hasError: boolean;
  loading: boolean;
}

export default class TodoComponent extends React.Component<TodoComponentProps, TodoComponentState>
  implements BaseView {
  private todoViewModel: TodoViewModel;

  public constructor(props: TodoComponentProps) {
    super(props);

    const { todoViewModel } = this.props;
    this.todoViewModel = todoViewModel;

    this.state = {
      data: todoViewModel.todos,
      loading: todoViewModel.loading,
      hasError: todoViewModel.hasError,
      error: todoViewModel.error,
    };
  }

  public componentDidMount(): void {
    this.todoViewModel.attachView(this);
    this.todoViewModel.onFetch();
  }

  public componentWillUnmount(): void {
    this.todoViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      data: this.todoViewModel.todos,
      loading: this.todoViewModel.loading,
      hasError: this.todoViewModel.hasError,
      error: this.todoViewModel.error,
    });
  }

  public render(): JSX.Element {
    const { data, loading, hasError, error } = this.state;
    console.log(data);
    return (
      <div style={{ width: '90%', margin: 'auto' }}>
        <br />
        <br />
        <br />
        <h1>Todo</h1>
        <p>State: {hasError ? 'error' : loading ? 'loading' : 'data'}</p>
        <button onClick={this.todoViewModel.onFetch}>Refresh</button>
        <br />
        {hasError && (
          <div>
            <h1>Error</h1>
            <p>{JSON.stringify(error)}</p>
          </div>
        )}
        {loading && (
          <div>
            <h1>Loading....</h1>
          </div>
        )}
        {data.length > 0 && (
          <div>
            <h1>Data</h1>
            {data.map((item, index) => (
              <TodoListItem key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
