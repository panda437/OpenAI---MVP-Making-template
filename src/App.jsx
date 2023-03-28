import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyApp from "./components/myApp.jsx";

export default function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<MyApp />} />
        </Routes>
      </Router>
    </main>
  );
}
