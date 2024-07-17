import axios from "axios";

const axiosObj = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

/// here the header will be set
axiosObj.interceptors.request.use((config) => {
  const useremail = localStorage.getItem("user");
  if (useremail) {
    config.headers = {
      ...config.headers,
      email: useremail,
    };
  }
  //   console.log(config.url, config.method);
  //   if (config.url.includes("/post") && config.method === "post") {
  //     config.headers = {
  //       "Content-Type": "multipart/form-data",
  //     };
  //   }
  return config;
});

export const login = (data) => {
  return axiosObj.post("/login", data);
};

export const signup = (data) => {
  return axiosObj.post("/signup", data);
};

export const getPosts = () => {
  return axiosObj.get("/post");
};

export const createPosts = (formData) => {
  return axiosObj.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
