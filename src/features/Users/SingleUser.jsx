import { forwardRef } from "react";
import { Link } from "react-router-dom";
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
  return (
    <Link to={`todos/${id}`}>
      <SingleUserEl
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>
          {name} <Decor>/</Decor> {username}
        </span>
      </SingleUserEl>
    </Link>
  );
});

export default SingleUser;
