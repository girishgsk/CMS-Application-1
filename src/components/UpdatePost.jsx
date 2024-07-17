import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/createPost.css";

const API = "http://127.0.0.1:3000/post/"; // don't forget to give "/" after url

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // `navigate` should be camelCase
  const [values, setValues] = useState({
    id: id,
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null); // Single image file, not an object

  useEffect(() => {
    axios
      .get(API + id)
      .then((res) => {
        setValues({
          ...values,
          title: res.data.data.title,
          description: res.data.data.description,
        });
        // setImage(res.file.data.image);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Added dependency array

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (image) {
      formData.append("image", image);
    }

    axios
      .put(API + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/post");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-Signup-body">
      <div className="container-login">
        <h1>Update Post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
