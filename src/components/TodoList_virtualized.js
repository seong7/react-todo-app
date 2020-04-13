/* react-virtualized 라이브러리 사용한 코드 */

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

export default React.memo(TodoList);
//             React.memo 이용해 컴포넌트 성능 최적화
//               - props 가 바꼈을 때만 update _re-render 함
//               - 하지만, performance 체크해보면 크게 차이는 없음 (0.2 ~ 0.8 s 정도 단축됨)

//              : TodoList 의 경우 부모인 App Component 이미 todos 의 변화에만 re-render 되도록 설정되어 있어
//                현재 상황에서는 이미 최적화 되어 있다고 볼 수 있다. (React.memo 불필요)
//               ! 하지만, App Component 에 다른 state 가 추가된다면 해당 state 의 업데이트에도 re-render 가 발생할 것
//                 그러므로 미리 그 것을 방지하고자 React.memo 를 사용해 todoList 를 미리 최적화해줬다.
