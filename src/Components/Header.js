import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <header>
        <Container>
          <Title>Spacetagram</Title>
        </Container>
      </header>
    </>
  );
};

const Title = styled.h1`
  padding: 0px;
  width: 200px;
  color: white;
`;
const Author = styled.h2`
  text-align: right;
  padding: 0px;
  width: 300px;
  font-style: italic;
  color: white;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;

  background-image: linear-gradient(to bottom right, black, blue);
  height: 100px;
`;

export default Header;
