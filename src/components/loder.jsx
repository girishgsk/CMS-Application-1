import React from "react";

const Loader = ({ show }) => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      Loading ...
    </div>
  );
};

export default Loader;
