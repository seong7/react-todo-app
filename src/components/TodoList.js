import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  // console.log(todos); //__  onToggle 후 re-render 될 때 todos 의 상태 확인하기
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
      {/* 배열로 생성하 때는 고유값 key 를 넘겨줘야함*/}
    </div>
  );
};

export default TodoList;
