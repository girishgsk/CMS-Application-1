import React, { useEffect, useState } from "react";
// import Loader from "./loder";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPosts } from "../services";
import "./Post.css";

const Posts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPosts() // from axios
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:3000/post/${id}`)
      .then((res) => {
        setData(data.filter((post) => post._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container_post-body">
        <div className="container_post">
          <div className="postdata">
            <tables className="tables">
              <thead className="tables-head">
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th>image</th>
                <th>created_at</th>
                <th>updated_at</th>
                <th>created_by</th>
                <th>updated_by</th>
                <th>UpdatePost</th>
                <th>DeletePost</th>
              </thead>

              <tbody className="tables-body">
                {data && data.length > 0 ? (
                  data.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.title}</td>
                      <td>{user.description}</td>
                      <td>
                        <div className="image">
                          <img
                            src={user.image?.replace(
                              "./files",
                              "http://localhost:3000"
                            )}
                            alt={user.image}
                            width="100"
                            height="100"
                          />
                        </div>
                      </td>
                      <td>{user.created_at}</td>
                      <td>{user.updated_at}</td>
                      <td>{user.created_by}</td>
                      <td>{user.updated_by}</td>

                      <td>
                        <button className="UpdateButton">
                          <Link to={`/update/${user._id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="deleteButton"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-data">
                    <td colSpan="10">No data available</td>
                  </tr>
                )}
              </tbody>
            </tables>
          </div>
        </div>
      </div>
      <div className="createPostLink">
        <p>
          want to Create Post ?<Link to="/createPost">Create Post</Link>
        </p>
      </div>
    </>
  );
};

export default Posts;
