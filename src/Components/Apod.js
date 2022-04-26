import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import Loading from "./Loading";

const Apod = () => {
  //Created states to capture data after it is done fetching from our API
  const [content, setContent] = useState([]);
  //Set a loading state to conditionally render all our data once it has been succesfully fetched.
  //If it is not yet done loading, a spinning circle will appear in the middle with the title.
  const [loading, setLoading] = useState(true);

  //Set states for the user to enter the start date and end date of when they want to set the images to load.
  //The states are intially set at pre-determined dates to load initial data.
  const [startDate, setStartDate] = useState("2021-05-29");
  const [endDate, setEndDate] = useState("2021-06-10");

  //The use effect here is used to fetch the data and parse it.
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //Until setContent finally sets the data from the fetch into the state content, loading will remain false.
        //Once it is done, loading well then turn true and allow the data to render in the application based on conditional rendering.
        setContent(data);
        setLoading(false);
      });
  }, []);

  //fetchData is a async/await function that is run one the user enters the dates they would like to see the data and will run on submit.
  const fetchData = async () => {
    const test = await fetch(
      //Through interpolation, we enter the state of startDate and endDate in the fetch in order to acheive the requested data.
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    const result = await test.json();
    //Once the data is fetched, setContent will set the data into the variable content.
    setContent(result);
  };

  //Here is the function that will run fetchData when the user clicks submit.
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      {/* Here we see the conditional render based on the loading state in the return */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            {/* This is where the user will input the date information. */}
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
            {content.map((val) => {
              let num = Math.floor(Math.random() * 10000000);
              return (
                <>
                  <Container>
                    <Card key={num}>
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
              );
            })}
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
