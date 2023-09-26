import styled from "styled-components";

const MainWrapper = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Notebook = styled.div`
  align-content: center;
  border: 4px solid;
  width: 600px;
  height: 700px;
  border-radius: 24px;
  box-shadow: 12px 12px #33322e;
  background-color: #f9f3e5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-height: 799px) {
    height: 500px;
  }

  @media (max-width: 767px) {
    width: 400px;
    height: 500px;
    box-shadow: 6px 6px #33322e;
  }
  @media (max-width: 374px) {
    height: 400px;
  }
`;

const Main = ({ children }) => {
  return (
    <MainWrapper>
      <Notebook>{children}</Notebook>
    </MainWrapper>
  );
};

export default Main;
