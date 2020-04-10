import React from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';

function App() {
  return (
    <TodoTemplate>
      <TodoInsert />
    </TodoTemplate>
  );
}

export default App;
