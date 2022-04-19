import React, { useState } from "react";
import styled from "styled-components";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [btnContent, setBtnContent] = useState("Like");
  const like = (e) => {
    if (liked === true) {
      setLiked(false);
      setBtnContent("Liked");
    } else {
      setLiked(true);
      setBtnContent("Like");
    }
  };
  return (
    <button className="btn btn-primary" onClick={like}>
      {btnContent}
    </button>
  );
};

export default LikeButton;
