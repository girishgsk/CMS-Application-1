import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
