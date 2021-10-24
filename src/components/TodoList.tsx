import React from 'react';
import TodoListItem, { ITodoListItem } from './TodoListItem';
import './TodoList.scss';
import { Todo } from 'src/App';

interface ITodoList extends Omit<ITodoListItem, 'todo'> {
  todos: Todo[];
}

const TodoList = ({ todos, onRemove, onToggle }: ITodoList) => {
  console.log(todos); //__  onToggle 후 re-render 될 때 todos 의 상태 확인하기
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);
