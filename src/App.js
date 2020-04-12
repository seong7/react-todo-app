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
  // useState 에 callback 함수를 넣어주어 다량의 데이터 생성
  // createBulkTodos() 라고 하면 rerender 될 때마다 새로 생성함 !
  // () 없이 callback fn 으로 넣어주면 첫 렌더링때만 create~ 함수가 실행됨

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초를 알아보자',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해보기',
  //     checked: false,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

  // 고윳값으로 사용될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(2501); // 초기화

  // props 로 자식에게 넘겨주는 함수는 useCallback 사용 습관화 하기 .. 왜??
  //      혹시 변화가 없으면 자식 컴포넌트에서도 함수를 한번만 생성할 수 있기 때문? => 효율성 개선

  /* todo 추가해주는 함수 */
  const onInsert = useCallback(
    // todos data 에 접근해야하므로 App.js 에 선언해준 것 같다...?

    (text) => {
      // text 를 받아 새로운 todo 객체 생성
      const todo = {
        id: nextId.current, // .current 로 호출해야 현재 id 값 가져옴
        text,
        checked: false,
      };

      // 생성된 todo 를 todos (state) 에 추가
      // 성능 최적화 전
      setTodos(todos.concat(todo));
      // useCallback 의 두번째 매개변수 배열에 [todos] 넣어줘야함 (의존성 때문)

      // id 값 + 1
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos],
    // onInsert 는 todos (state) 에 의존하고 있으므로 반드시 배열에 넣어줌
    // todos 가 변경될 때만 함수가 생성됨;
  );

  /* todo 항목 삭제하는 함수 */
  const onRemove = useCallback(
    (id) => {
      // const nextTodos = todos.filter((todo) => todo.id !== id);
      // setTodos(nextTodos);

      // 성능 최적화 전
      setTodos(todos.filter((todo) => todo.id !== id)); // filter 사용해주면 새로운 변수에 담지 않아도 불변성 유지됨
      // useCallback 의 두번째 매개변수 배열에 [todos] 넣어줘야함 (의존성 때문)
    },
    [todos],
  );

  /* todo 항목 수정하는 함수 */
  const onToggle = useCallback(
    (id) => {
      // 성능 최적화 전
      setTodos(
        todos.map(
          (todo) =>
            // (todo.checked = todo.id === id ? !todo.checked : todo.checked),
            //        이렇게 해주면 key, id 가 없어짐
            (todo =
              todo.id === id ? { ...todo, checked: !todo.checked } : todo),
        ),
      );
      // useCallback 의 두번째 매개변수 배열에 [todos] 넣어줘야함 (의존성 때문)
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
