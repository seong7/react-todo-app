import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames'; // 조건부 스타일링 위해 사용

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  // 이렇게 단순한 경우에는 그냥 return 영역에 onClick={onRemove} 로 설정해주면 됨 (onInsert 와는 차이가 있음)
  // const onClick = useCallback(
  //   (e) => {
  //     onRemove(id);
  //   },
  //   [onRemove, id],
  // );

  return (
    <div className="TodoListItem">
      <div
        className={cn('checkbox', { checked })}
        onClick={() => {
          onToggle(id);
        }}
      >
        {/* { } 안의 값이 true 이면 text로 className 에 추가함 */}

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
        {/* set state 함수는 비동기 코드이므로 () => {} 에 넣어주기 */}
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
//             React.memo 이용해 컴포넌트 성능 최적화
//               - props 가 바꼈을 때만 update _re-render 함
//               - 하지만, performance 체크해보면 크게 차이는 없음 (0.2 ~ 0.8 s 정도 단축됨)
