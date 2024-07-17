import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../services";
import "../css/createPost.css";

// src/CreatePost.js

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      window.alert("Input field is required");
      return false;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // try {
    //   const res = await axios.post("http://127.0.0.1:3000/post", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       email: "maitu18@gmail.com",
    //     },
    //   });

    try {
      const res = await createPosts(formData);
      if (res.status === 400) {
        window.alert("Input field is required");
      } else {
        setMessage(res.data.message);
        navigate("/post");
      }
    } catch (error) {
      setMessage(error.response.data.message); // here the response is required NO res
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-createPost">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button type="submit">Create Post</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default CreatePost;
