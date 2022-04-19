import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <header>
        <Container>
          <Title>Spacetagram</Title>
          <Author>Developed by Rakin Bhuiyan</Author>
        </Container>
      </header>
    </>
  );
};

const Title = styled.h1`
  padding: 0px;
  width: 200px;
  background-color: blue;
`;
const Author = styled.h2`
  text-align: right;
  padding: 0px;
  width: 300px;
  background-color: red;
`;
const Container = styled.div`
  border-bottom: 3px solid black;
`;

export default Header;
