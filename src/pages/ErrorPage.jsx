import styled from "styled-components";

import Main from "../layouts/Main";
import notfound from "../assets/404.gif";

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
  & span {
    text-transform: none;
  }
  @media (max-width: 767px) {
    font-size: 22px;
    padding: 15px;
  }
`;

const ImgContainer = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ErrorPage = ({ children }) => {
  return (
    <>
      <Main>
        <Title>{children}</Title>
        <ImgContainer>
          <img src={notfound} alt="" />
        </ImgContainer>
      </Main>
    </>
  );
};

export default ErrorPage;
