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
  console.log(content);
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
              <>
                <Container>
                  <Card>
                    <CardHeader>
                      <Image
                        src={val.hdurl ? val.hdurl : val.url}
                        alt="card__image"
                        width="600"
                      />
                    </CardHeader>
                    <CardBody>
                      <h4>{val.title}</h4>
                      <p>{val.explanation}</p>
                    </CardBody>
                    <CardFooter>
                      <LikeButton />
                    </CardFooter>
                  </Card>
                </Container>
              </>
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
`;
const CardHeader = styled.div``;
const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CardFooter = styled.div`
  display: flex;
  padding: 1rem;
  margin-top: auto;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
  object-fit: cover;
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  gap: 2rem;
  margin: 2rem;
`;

export default Apod;
