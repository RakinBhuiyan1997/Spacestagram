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
          <Header>
            <Form onSubmit={handleSubmit}>
              <Label>Enter Start Date after 1995-06-16</Label>
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <Label>Enter End Date</Label>
              <Input
                type="text"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Header>
          <PhotoWrapper>
            {content.map((val) => (
              <ImageBox>
                <div>
                  <Image src={val.hdurl ? val.hdurl : val.url} />
                  <Title>{val.title}</Title>
                  <Date>Photo Taken: {val.date}</Date>
                  <Description>
                    <Span>Description:</Span> {val.explanation}
                  </Description>
                </div>
                <LikeButton />
              </ImageBox>
            ))}
          </PhotoWrapper>
        </>
      )}
    </>
  );
};

const Header = styled.header`
  background-color: #f6f6f7;
`;

const PhotoWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: #f6f6f7;
  overflow: scroll;
  height: 700px;
`;
const ImageBox = styled.div`
  width: 450px;
  background-color: #f6f6f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  align-items: center;
  margin: 20px;
  border-radius: 5px;
  border: 2px solid #f1f1f2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  margin-bottom: 10px;
  border-radius: 5px 5px 0px 0px;
`;
const Span = styled.span`
  text-decoration: underline;
  font-weight: bold;
`;
const Title = styled.h2``;
const Description = styled.p`
  margin-top: 10px;
  line-height: 30px;
`;
const Date = styled.p`
  font-style: italic;
  color: grey;
  font-weight: bold;
`;

const Form = styled.form`
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const Label = styled.label`
  margin: 20px;
  font-style: italic;
  font-weight: bold;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;
  text-align: center;
  background-color: #f6f6f7;
`;

const Button = styled.button`
  margin: 20px;
  border: 1px solid black;
  border-radius: 5px;
  height: 30px;
  width: 80px;
  outline: none;
  cursor: pointer;
  color: white;
  background-color: black;

  :hover {
    border: 1px solid red;
  }
`;

export default Apod;
