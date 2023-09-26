import styled from "styled-components";
import { useDispatch } from "react-redux";
import { forwardRef } from "react";

import checkboxIcon from "../../assets/boxtodo.png";
import checkboxCompleted from "../../assets/green.png";
import checkboxDelete from "../../assets/checkbox - discard.png";

import { deleteTodo, toggleTodo } from "./todosSlice";
import { useFetch } from "../../hooks/useFetch";

const TodoEl = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  border-bottom: 1px dashed;
  opacity: 1;

  @media (max-width: 479px) {
    padding: 10px 0;
  }
`;

const TodoText = styled.span`
  flex: 1 1 auto;
  text-align: start;
  position: relative;
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;

const Button = styled.button`
  box-sizing: border-box;
  flex: 0 0 auto;

  @media (max-width: 479px) {
    height: 20px;
    flex-basis: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Todo = forwardRef(({ title, completed, id, provided }, _) => {
  const { request } = useFetch();
  const dispatch = useDispatch();
  const onDelete = () => {
    request(`https://jsonplaceholder.typicode.com/todos/${id}`, "DELETE")
      .then((data) => console.log(data, "Deleted"))
      .then(dispatch(deleteTodo(id)))
      .catch((err) => console.log(err));
  };

  const onToggle = () => {
    request(`https://jsonplaceholder.typicode.com/todos/${id}`, "PATCH")
      .then((data) => console.log(data, "PATCHED"))
      .then(dispatch(toggleTodo({ id, changes: { completed: !completed } })))
      .catch((err) => console.log(err));
  };

  return (
    <TodoEl
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Button onClick={onToggle}>
        <Img src={completed ? checkboxCompleted : checkboxIcon} alt="" />
      </Button>
      <TodoText $completed={completed}>{title}</TodoText>
      <Button onClick={onDelete}>
        <Img src={checkboxDelete} alt="" />
      </Button>
    </TodoEl>
  );
});

export default Todo;
