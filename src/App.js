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

  // 고윳값으로 사용될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4); // 초기화

  // props 로 자식에게 넘겨주는 함수는 useCallback 사용 습관화 하기 .. 왜??
  //      혹시 변화가 없으면 자식 컴포넌트에서도 함수를 한번만 생성할 수 있기 때문? => 효율성 개선

  // todo 추가해주는 함수
  // todos datat 에 접근해야하므로 App.js 에 선언해준 것 같다...?
  const onInsert = useCallback(
    (text) => {
      // text 를 받아 새로운 todo 객체 생성
      const todo = {
        id: nextId.current, // .current 로 호출해야 현재 id 값 가져옴
        text,
        checked: false,
      };

      // 생성된 todo 를 todos (state) 에 추가
      setTodos(todos.concat(todo));

      // id 값 + 1
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos],
    // onInsert 는 todos (state) 에 의존하고 있으므로 반드시 배열에 넣어줌
    // todos 가 변경될 때만 함수가 생성됨
  );

  // 항목 삭제 함수
  const onRemove = useCallback(
    (id) => {
      // const nextTodos = todos.filter((todo) => todo.id !== id);
      // setTodos(nextTodos);
      setTodos(todos.filter((todo) => todo.id !== id)); // filter 사용해주면 새로운 변수에 담지 않아도 불변성 유지됨
    },
    [todos],
  );

  // 항목 수정 함수
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map(
          (todo) =>
            // (todo.checked = todo.id === id ? !todo.checked : todo.checked),
            //        이렇게 해주면 key, id 가 없어짐
            (todo =
              todo.id === id ? { ...todo, checked: !todo.checked } : todo),
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      {/* props 에 넣어주므로, 반드시 useCallback 처리 필요 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
