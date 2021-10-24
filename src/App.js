import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초를 알아보자',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: false,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);
  const nextId = useRef(4); // 초기화

  /* todo 추가해주는 함수 */
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current, // .current 로 호출해야 현재 id 값 가져옴
      text,
      checked: false,
    };

    setTodos((todos) => todos.concat(todo));

    nextId.current += 1; // nextId 1씩 더하기
  }, []);

  /* todo 항목 삭제하는 함수 */
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  /* todo 항목 수정하는 함수 */
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map(
        (todo) =>
          (todo = todo.id === id ? { ...todo, checked: !todo.checked } : todo),
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
