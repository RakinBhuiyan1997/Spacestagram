import React, { useState } from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const like = (e) => {
    if (liked === false) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  return (
    <Button onClick={like}>
      {liked && (
        <>
          <Liked>Liked! </Liked>
          <AiFillHeart color="red" size={70} />
        </>
      )}
      {!liked && (
        <>
          <Like>Like: </Like>
          <AiOutlineHeart size={70} />
        </>
      )}
    </Button>
  );
};

const Button = styled.button`
display: flex;
flex-direction: row;

  cursor: pointer;
  border: none;
  background: linear-gradient(to right, #ffffff, #ece9e6)
  position: relative;
  margin-left: 30%;
`;

const Like = styled.p`
  margin-top: 10px;
  font-size: 40px;
`;
const Liked = styled.p`
  margin-top: 10px;
  font-size: 40px;
`;

export default LikeButton;
