/* 컴포넌트 성능 최적화 - useState 의 set 함수에 함수형 매개변수 사용하기 */

import React, { useState, useRef, useCallback } from 'react';
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

function App() {
  const [todos, setTodos] = useState(createBulkTodos);
  const nextId = useRef(2501); // 초기화

  /* todo 추가해주는 함수 */
  const onInsert = useCallback(
    // todos data 에 접근해야하므로 App.js 에 선언해준 것 같다...?

    (text) => {
      const todo = {
        id: nextId.current, // .current 로 호출해야 현재 id 값 가져옴
        text,
        checked: false,
      };

      // 성능 최적화 __ useState 에 함수형 매개변수 사용
      setTodos((todos) => todos.concat(todo));
      // useCallback 의 두번째 매개변수에 빈 배열 넣어줘도됨 (의존성 사라졌기 때문)

      nextId.current += 1; // nextId 1씩 더하기
    },
    [],
  );

  /* todo 항목 삭제하는 함수 */
  const onRemove = useCallback((id) => {
    // 성능 최적화 __ useState 에 함수형 매개변수 사용
    setTodos(
      (todos) => todos.filter((todo) => todo.id !== id),
      // useCallback 의 두번째 매개변수에 빈 배열 넣어줘도됨 (의존성 사라졌기 때문)
    );
  }, []);

  /* todo 항목 수정하는 함수 */
  const onToggle = useCallback((id) => {
    // 성능 최적화 __ useState 에 함수형 매개변수 사용
    setTodos((todos) =>
      todos.map(
        (todo) =>
          (todo = todo.id === id ? { ...todo, checked: !todo.checked } : todo),
      ),
    );
    // useCallback 의 두번째 매개변수에 빈 배열 넣어줘도됨 (의존성 사라졌기 때문)
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
