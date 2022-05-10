import logo from "./logo.svg";
import "./App.css";

const Input = ({ prefixComponent, ...props }) => (
  <>
    {prefixComponent}
    <input {...props} />
  </>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Input
          // Error Prone, runtime error
          prefixComponent={{ bla: "1234" }}
          value="Lunch & Lurn"
        />
      </header>
    </div>
  );
}

export default App;
