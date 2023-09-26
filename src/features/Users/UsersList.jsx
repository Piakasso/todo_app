import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../index.css";

import SingleUser from "./SingleUser";
import {
  clearUsers,
  fetchUsers,
  selectLoadingUsers,
  selectUsers,
  setUsers,
} from "./usersSlice";
import Skeleton from "../Skeleton/Skeleton";

const UsersListEl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 46px 31px;
  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const UsersList = () => {
  const loading = useSelector(selectLoadingUsers);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    return () => {
      dispatch(clearUsers());
    };
  }, [dispatch]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedList = [...users];
    const [reorderedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, reorderedItem);
    dispatch(setUsers(reorderedList));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="users">
        {(provided) => (
          <UsersListEl
            className="users"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {users.map((item, index) => {
              return (
                <Draggable
                  key={item.id}
                  index={index}
                  draggableId={item.id.toString()}
                >
                  {(provided) => <SingleUser provided={provided} {...item} />}
                </Draggable>
              );
            })}
            {provided.placeholder}
            {loading === "loading" && <Skeleton />}
          </UsersListEl>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default UsersList;
