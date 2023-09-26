import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";

import Todo from "./Todo";
import {
  fetchTodos,
  selectAll,
  selectFilteredTodos,
  selectLoadingTodos,
  setActiveUser,
  setAll,
} from "./todosSlice";
import Skeleton from "../Skeleton/Skeleton";

const TodolistEl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 46px 31px;
  gap: 8px;

  @media (max-width: 767px) {
    padding: 15px;
  }
`;

const TodosList = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const todos = useSelector(selectAll);

  const loading = useSelector(selectLoadingTodos);

  useEffect(() => {
    dispatch(fetchTodos(`${slug}/todos`));
    dispatch(setActiveUser(slug));
  }, [dispatch, slug]);
  const filteredTodos = useSelector(selectFilteredTodos);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedList = [...todos];
    const [reorderedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, reorderedItem);
    dispatch(setAll(reorderedList));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todolist">
        {(provided) => (
          <TodolistEl
            className="todolist"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTodos.map((item, index) => {
              return (
                <Draggable
                  key={item.id}
                  index={index}
                  draggableId={item.id.toString()}
                >
                  {(provided) => <Todo {...item} provided={provided} />}
                </Draggable>
              );
            })}
            {provided.placeholder}
            {loading === "loading" && <Skeleton />}
          </TodolistEl>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodosList;
