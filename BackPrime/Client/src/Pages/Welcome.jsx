import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../Redux/slices/userSlice";
const Welcome = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const code = searchParams.get("code");
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(signin(code));
  };
  return (
    <div>
      <div>Welcome</div>
      <button onClick={loginHandler}>Continue to our website</button>
    </div>
  );
};

export default Welcome;
