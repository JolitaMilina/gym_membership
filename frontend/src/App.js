import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./components/Form/Form";

function App() {
  return (
    <div className="container p-4">
      <h1 className="mb-3"> Gym Membership Form </h1>
      <Form />
    </div>
  );
}

export default App;
