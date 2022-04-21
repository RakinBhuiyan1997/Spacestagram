import Apod from "./Components/Apod";
import GlobalStyles from "./Components/GlobalStyles";
import Header from "./Components/Header";
function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <header className="App-header">
          <Header />
          <Apod />
        </header>
      </div>
    </>
  );
}

export default App;
