import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderSpinner = ({ color = "gray", width = "100" }) => {
  return (
    <RotatingLines
      strokeColor={color}
      strokeWidth="5"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
  );
};

export default LoaderSpinner;
