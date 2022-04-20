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
  flex-direction: column;
  align-items: center;
  border-bottom: 3px solid black;
  background-color: black;
`;

export default Header;
