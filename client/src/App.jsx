import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import PropertyDetail from "./components/PropertyDetails";
import Properties from "./components/Properties";
import PostProperty from "./components/PostProperty";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
