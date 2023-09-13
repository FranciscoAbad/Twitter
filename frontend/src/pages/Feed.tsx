import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/Store";
import { setToken } from "../redux/Slices/UserSlice";

export const Feed: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  useEffect(() => {
    if (jwt === "" && state.token !== "") {
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      dispatch(setToken(jwt));
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>FEED</h1>
    </div>
  );
};
