import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { changeControl } from "./controlSlice";

const Filter = styled.select`
  border: 1px inherit solid;
  border-radius: 6px;
  height: 30px;
  font-size: inherit;
  box-shadow: 6px 6px #33322e;
  @media (max-width: 479px) {
    height: 20px;
    width: 60px;
    box-shadow: 3px 3px #33322e;
  }
`;

const Controls = () => {
  const [value, setValue] = useState("all");
  const dispatch = useDispatch();
  const onChangeControl = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(changeControl(value));
  }, [dispatch, value]);
  return (
    <Filter onChange={onChangeControl}>
      <option value="all">all</option>
      <option value="completed">completed</option>
      <option value="active">active</option>
    </Filter>
  );
};

export default Controls;
