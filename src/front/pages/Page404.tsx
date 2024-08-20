import { Link } from "react-router-dom";

import "../styles/pages/Page404.css";

const Page404 = () => {
  return (
    <div className="container-404 h-screen flex flex-col items-center  text-center">
      <h1 className="text-9xl text-[#855eda] drop-shadow-[4px_4px_0px_#f9e2af] mt-20 font-pixel">
        404
      </h1>
      <p className="text-2xl text-[#f9e2af] mt-20 font-pixel">
        Oops! Page not found.
      </p>
      <p className="text-2xl text-[#f9e2af]  font-pixel">
        Here take the train.
      </p>
      <Link
        to="/"
        className="mt-8 px-8 py-4 text-lg bg-[#855eda] text-[#f9e2af] border-4 border-[#f9e2af] rounded hover:bg-[#f9e2af] hover:text-[#855eda] transition-all duration-300 font-pixel"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Page404;
