import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import Loading from "./Loading";

const Apod = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2021-05-29");
  const [endDate, setEndDate] = useState("2021-06-10");
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      });
  }, []);
  const fetchData = async () => {
    const test = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    const result = await test.json();
    console.log(result);
    setContent(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <form onSubmit={handleSubmit}>
              <label>Enter Start Date after 1995-06-16</label>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <label>Enter End Date</label>
              <input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
              <button type="submit">Submit</button>
            </form>
          </header>
          <PhotoWrapper>
            {content.map((val) => (
              <ImageBox>
                <Image src={val.hdurl ? val.hdurl : val.url} />
                <Title>{val.title}</Title>
                <Date>Photo Taken: {val.date}</Date>
                <Description>{val.explanation}</Description>
                <LikeButton />
              </ImageBox>
            ))}
          </PhotoWrapper>
        </>
      )}
    </>
  );
};

const PhotoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: #f6f6f7;
`;
const ImageBox = styled.div`
  width: 450px;
  background-color: #f6f6f7;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  margin: 20px;
  border-radius: 5px;
  border: 2px solid #f1f1f2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
  border-radius: 5px;
`;
const Title = styled.h2``;
const Description = styled.p``;
const Date = styled.p``;

export default Apod;
