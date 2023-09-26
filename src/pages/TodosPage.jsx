import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";

import { fetchTodos, setActiveUser } from "../features/Todos/todosSlice";

import Main from "../layouts/Main";
import TodosList from "../features/Todos/TodosList";
import FormTodo from "../features/Todos/FormTodo";
import Controls from "../features/Controls/Controls";
import ErrorPage from "./ErrorPage";

import { selectErrorTodos } from "../features/Todos/todosSlice";
import { useDispatch } from "react-redux";

const Title = styled.h1`
  position: sticky;
  top: 0;
  background-color: #f6a89e;
  padding: 28px;
  font-size: 32px;
  font-weight: 700;
  border-bottom: 4px solid;
  text-transform: uppercase;
  text-align: center;
  z-index: 2;
  @media (max-height: 479px) {
    font-size: 22px;
    padding: 15px;
  }
  @media (max-width: 767px) {
    font-size: 22px;
    padding: 15px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;

const TodosPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchTodos(`${slug}/todos`));
    dispatch(setActiveUser(slug));
  }, [dispatch, slug]);
  const error = useSelector(selectErrorTodos);

  return error ? (
    <ErrorPage>
      ohh no!!!!
      <br />
      <span>{error}</span>
    </ErrorPage>
  ) : (
    <Main>
      <Title>Things to do</Title>
      <ControlsContainer>
        <FormTodo />
        <Controls />
      </ControlsContainer>
      <TodosList />
    </Main>
  );
};

export default TodosPage;
