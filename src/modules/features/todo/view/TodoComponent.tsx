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
  status: string;
  error: string;
}

export default class TodoComponent extends React.Component<TodoComponentProps, TodoComponentState>
  implements BaseView {
  private todoViewModel: TodoViewModel;

  public constructor(props: TodoComponentProps) {
    super(props);

    const { todoViewModel } = this.props;
    this.todoViewModel = todoViewModel;

    this.state = {
      data: todoViewModel.data,
      status: todoViewModel.status,
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
      data: this.todoViewModel.data,
      status: this.todoViewModel.status,
    });
  }

  public render(): JSX.Element {
    const { data, status, error } = this.state;
    return (
      <div style={{ width: '90%', margin: 'auto' }}>
        <br />
        <br />
        <br />
        <h1>Todo</h1>
        <p>State: {status}</p>
        <button onClick={this.todoViewModel.onFetch}>Refresh</button>
        <br />
        {status === 'error' && (
          <div>
            <h1>Error</h1>
            <p>{JSON.stringify(error)}</p>
          </div>
        )}
        {status === 'loading' && (
          <div>
            <h1>Loading....</h1>
          </div>
        )}
        {status === 'data' && data.length > 0 && (
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
