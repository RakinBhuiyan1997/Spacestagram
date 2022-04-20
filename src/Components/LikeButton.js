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
      {liked && <AiFillHeart color="red" size={40} />}
      {!liked && <AiOutlineHeart size={40} />}
    </Button>
  );
};

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
`;

export default LikeButton;
