import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { clearTodos } from "../features/Todos/todosSlice";

const HeaderEl = styled.header`
  display: flex;
  padding: 20px 0 0 0;
  border-bottom: 8px solid;
  justify-content: space-between;
  @media (max-width: 767px) {
    border-bottom: 4px solid;
  }
`;

const HeaderLink = styled.li`
  cursor: pointer;
  list-style: none;
  background-color: ${(props) => (props.$bg ? "#2d9cdb" : "#F9F3E5")};
  padding: 16px 32px;
  border-radius: 16px 16px 0 0;
  border: solid 2px;
  @media (max-width: 767px) {
    padding: 10px 20px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <HeaderEl>
      <Link
        to="/"
        onClick={() => {
          dispatch(clearTodos());
        }}
      >
        <HeaderLink $bg={location.pathname === "/" ? true : false}>
          Users
        </HeaderLink>
      </Link>
    </HeaderEl>
  );
};

export default Header;
