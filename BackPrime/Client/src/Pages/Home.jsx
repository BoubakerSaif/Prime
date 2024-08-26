import React from "react";

const Home = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.open("http://localhost:5000/auth/discord/login");
        }}
      >
        Connect discord
      </button>
    </div>
  );
};

export default Home;
