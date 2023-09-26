import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SingleUserEl = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed;
  cursor: pointer;
`;

const Decor = styled.span`
  color: #8cd4cb;
`;

const SingleUser = forwardRef(({ name, username, id, provided }, _) => {
  const navigate = useNavigate();

  const showUserTodolists = () => {
    navigate(`todos/${id}`);
  };
  return (
    <SingleUserEl
      onClick={showUserTodolists}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span>
        {name} <Decor>/</Decor> {username}
      </span>
    </SingleUserEl>
  );
});

export default SingleUser;
