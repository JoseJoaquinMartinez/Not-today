import { useNavigate } from "react-router-dom";

import backgroundImg from "../../public/signup-backgorund.jpg";
import hamacabotImg from "../../public/hamacabot.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen relative">
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="md:w-1/2 flex flex-col justify-center items-center px-12 z-10 my-2 md:my-5">
        <article className="text-center">
          <h1 className="text-6xl font-bold text-white mb-5">Not Today</h1>
          <h2 className="text-3xl text-white mb-5 md:mb-8">
            Do you really have to do it?
          </h2>
        </article>
        <article className="flex">
          <button
            className="bg-[#855EDA] hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg mr-5"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
          <button
            className="bg-[#855EDA] hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </article>
      </div>

      <div className="md:w-1/2 flex justify-center items-center z-10">
        <img
          src={hamacabotImg}
          alt="Lazy bot"
          className="max-w-xs shadow-xl size-md:max-w-none"
          style={{ boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.5)" }}
        />
      </div>
    </div>
  );
};

export default Home;
