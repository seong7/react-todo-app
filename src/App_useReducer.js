import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// bulk data 생성해 lag 발생시켜보기
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checkd: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);

    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);

    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );

    default:
      return todos;
  }
}

function App() {
  const [todos, dispatch] = useReducer(
    todoReducer,
    undefined,
    createBulkTodos,
    /* 두번째 매개변수에 undefined 넣고 
       세번째에 callback 함수 넣어주면
       컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수가 호출된다.
    */
  );
  const nextId = useRef(2501); // 초기화

  /* todo 추가해주는 함수 */
  const onInsert = useCallback((text) => {
    // text 를 받아 새로운 todo 객체 생성
    const todo = {
      id: nextId.current, // .current 로 호출해야 현재 id 값 가져옴
      text,
      checked: false,
    };

    // 성능 최적화 __ useReducer 사용
    dispatch({ type: 'INSERT', todo });
    // useCallback 의 두번째 매개변수에 빈 배열 넣어줘도됨 (의존성 사라졌기 때문)

    // id 값 + 1
    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  /* todo 항목 삭제하는 함수 */
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  /* todo 항목 수정하는 함수 */
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      {/* props 에 넣어주므로, 반드시 useCallback 처리 필요 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
