import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames'; // 조건부 스타일링 위해서 사용
import { Todo } from 'src/App';

export interface ITodoListItem {
  todo: Todo;
  onRemove: (param: number) => void;
  onToggle: (param: number) => void;
}

const TodoListItem = ({ todo, onRemove, onToggle }: ITodoListItem) => {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem">
      <div
        className={cn('checkbox', { checked })}
        /* { } 안의 값이 true 이면 text로 className 에 추가함 */

        onClick={() => {
          onToggle(id);
        }}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

        <div className="text">{text}</div>
      </div>
      <div
        className="remove"
        onClick={() => {
          onRemove(id);
        }}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default React.memo(
  TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo,
);
