import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { getTodoList, selectTodoList } from '../../todo/todoSlice';
import { TodoI } from '../../../types';

function Homepage() {
  const dispatch = useDispatch();
  const todolist = useSelector(selectTodoList);
  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);
  return (
    <>
      Homepage
      {todolist.map((item: TodoI) => (
        <li key={uuid()}>
          {' '}
          {item.title}
          {' '}
          <br />
        </li>
      ))}
    </>
  );
}

export default Homepage;
