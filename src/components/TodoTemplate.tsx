import React, { ReactNode } from 'react';
import './TodoTemplate.scss';

interface ITodoTemplate {
  children: ReactNode;
}

const TodoTemplate = ({ children }: ITodoTemplate) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default TodoTemplate;
