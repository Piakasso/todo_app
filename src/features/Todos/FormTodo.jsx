import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import green from "../../assets/green.png";

import { useFetch } from "../../hooks/useFetch";
import { addOneTodo, selectActiveUser } from "./todosSlice";

const FormTodoEl = styled.form`
  display: flex;
  justify-content: center;
  gap: 20px;
  @media (max-width: 767px) {
    gap: 8px;
  }
`;

const Form = styled.input`
  width: 200px;
  border: 1px inherit solid;
  border-radius: 6px;
  padding-left: 7px;
  box-shadow: 6px 6px #33322e;

  @media (max-width: 479px) {
    width: 150px;
    padding-left: 4px;
    box-shadow: 3px 3px #33322e;
  }
`;
const SubmitButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  box-shadow: 6px 6px #33322e;
  @media (max-width: 479px) {
    box-shadow: 3px 3px #33322e;
    height: 20px;
    width: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const FormTodo = () => {
  const activeUser = useSelector(selectActiveUser);
  const { request } = useFetch();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: nanoid(),
      title: inputValue,
      completed: false,
      userId: activeUser,
    };

    request(
      `https://jsonplaceholder.typicode.com/users/${activeUser}/todos`,
      "POST",
      JSON.stringify(newTodo)
    )
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(addOneTodo(newTodo)))
      .catch((err) => console.log(err));

    setInputValue("");
  };

  return (
    <FormTodoEl onSubmit={onSubmit}>
      <Form
        placeholder="Add new todo"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <SubmitButton type="submit" disabled={inputValue === "" ? true : false}>
        <Img src={green} alt="" />
      </SubmitButton>
    </FormTodoEl>
  );
};

export default FormTodo;
