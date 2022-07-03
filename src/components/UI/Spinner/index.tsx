import React from "react";
// import "./Spinner.css";

export const SpinnerHOC = (Component: any, children: any, props: any) => {
  const isLoading = props.isLoading;
  isLoading ? (
    <div className="SpinnerOverlay">
      <div className="SpinnerContainer" />
    </div>
  ) : (
    <Component {...props}></Component>
  );
}

export const Spinner = () => {
  return (
    <div className="SpinnerOverlay">
      <div className="SpinnerContainer" />
    </div>
  );
};
export const InsideSpinner = () => {
  return (
    <div className="SpinnerOverlay2">
      <div className="SpinnerContainer" />
    </div>
  );
};
