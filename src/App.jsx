import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "./layouts/Header";
import TodosPage from "./pages/TodosPage";
import UsersPage from "./pages/UsersPage";
import ErrorPage from "./pages/ErrorPage";

const AppEl = styled.div`
  position: relative;
  font-size: 16px;
  color: #18191f;
  font-weight: 700;
  background-color: ${(props) => (props.$active ? "#f6a89e" : "#d0f4f0")};
  height: 100vh;
  overflow-y: scroll;
  @media (max-width: 767px) {
    font-size: 14px;
    font-weight: 600;
  }
  @media (max-width: 479px) {
    overflow-y: hidden;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  padding: 0 15px;
  margin: 0 auto;
  box-sizing: border-box;
  height: 100%;
`;

function App() {
  const location = useLocation();

  return (
    <AppEl $active={location.pathname === "/" ? true : false}>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/todos/:slug" element={<TodosPage />} />
          <Route
            path="*"
            element={
              <ErrorPage>
                OOOOpppppssss!!
                <br />
                <span>Page doesn't exist</span>
              </ErrorPage>
            }
          />
        </Routes>
      </Wrapper>
    </AppEl>
  );
}

export default App;
