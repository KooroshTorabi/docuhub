import React, { useEffect, useState } from "react";
// import "./Dashboard.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { InsideSpinner, Spinner } from "../UI/Spinner";
import { useSelector } from "react-redux";
import { githubURL } from "../Helpers/GlobalVariables.js";
import Markdown from "markdown-to-jsx";

const Dashboard = () => {
  // const location = useLocation();
  const [state, setstate] = useState(false);
  // const navigate = useNavigate();
  const [md, setmd] = useState("");
  // const values = useSelector((state: any) => state.items);
  // const indexedValues = values.map((value: any, idx: any) => ({ ...value, id: idx + 1 }));
  // let currentValue = indexedValues.filter((value: any) => {
  //   return value.link === location.pathname.slice(1);
  // })[0];
  // if (location.pathname === "/README.md" || location.pathname === "/") {
  //   currentValue = indexedValues[0];
  // }
  // useEffect(() => {
  //   setstate(false);
  //   fetch(
  //     `${githubURL}${location.pathname === "/" ? "README.md " : location.pathname
  //     }`
  //   )
  //     .then((res) => res.text())
  //     .then((res) => {
  //       setstate(true);
  //       setmd(res);
  //       // $(".injectedMd").empty();
  //       // var $log = $(".injectedMd"),
  //       //   html = $.parseHTML(marked.parse(`${res}`));
  //       // $log.append(html);
  //     });
  // }, [location.pathname]);

  return (
    <>
      {!state ? (
        <div className="flex items-center justify-center h-[90vh]">
          <InsideSpinner />
        </div>
      ) : (
        <div className="dashboard">
          <div className="injectedMd">
            <Markdown>{md}</Markdown>
          </div>
          <div className="flex gap-5 my-8">
            {/* {currentValue?.id !== 1 && (
              <div
                className="cursor-pointer border border-gray-200 group text-right hover:!border-primary  rounded-md w-full flex items-center justify-between p-3"
                onClick={() => navigate(values[currentValue?.id - 2].link)}>
                <div className="text-2xl group-hover:text-primary">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div>
                  <div className="text-gray-400">Previous</div>
                  <div className="font-semibold group-hover:text-primary">
                    {values[currentValue?.id - 2]?.name}
                  </div>
                </div>
              </div>
            )}
            {currentValue?.id !== values.length && (
              <div
                className="cursor-pointer border border-gray-200 group hover:!border-primary  rounded-md w-full flex items-center justify-between p-3"
                onClick={() => navigate(values[currentValue?.id].link)}>
                <div>
                  <div className="text-gray-400">Next</div>
                  <div className="font-semibold group-hover:text-primary">
                    {values[currentValue?.id]?.name}
                  </div>
                </div>
                <div className="text-2xl group-hover:text-primary">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
