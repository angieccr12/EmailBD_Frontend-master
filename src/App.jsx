import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import NewEmail from "./components/NewEmail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/newemail" element={<NewEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
