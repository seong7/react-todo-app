import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  /*  함수를 한번만 생성하도록 useCallback 사용 */
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // 빈 배열 : 처음 렌더 때만 함수 생성함
  // 해당 함수는 state 값에 의존하고 있지 않음 : 업데이트 필요없음
  // => 빈배열 가능

  // onInsert 외에도 추가로 작업해야할 부분이 있으므로 onSubmit 이라는 새로운 함수 생성
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // value 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킴
      // 이를 방지하기 위해 다음 함수 호출
      e.preventDefault();
    },
    [onInsert, value], // onInsert 나 value 에 의존성
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        onChange={onChange}
        value={value}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

/* 

form 에서 button onClick 대신 onSubmit 을 사용하는 이유 :
  onSubmit 은 enter 키로도 발동이 된다.
  하지만 onClick 으로 작성하면 enter 키를 위해
  onKeyPress 이벤트 로직을 따로 작성해야 한다.

  */

export default TodoInsert;
