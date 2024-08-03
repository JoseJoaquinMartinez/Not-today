import React from "react";

const Home = () => {
    return (
        <div className="flex h-screen relative">
          <img
            src="../../../../public/signup-backgorund.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
    
          <div className="w-1/2 flex flex-col justify-center items-center px-12 z-10">
            <h1 className="text-6xl font-bold text-white mb-5">Not Today</h1>
            <h2 className="text-3xl text-white mb-8">Do you really have to do it today?</h2>
            <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg">
              Sign in
            </button>
          </div>
    
          <div className="w-1/2 flex justify-center items-center z-10">
            <img
              src="../../../../public/hamacabot.jpg"
              alt="Lazy bot"
              className="max-w-xs shadow-xl"
              style={{ boxShadow: '0 0 20px 10px rgba(0, 0, 0, 0.5)' }}
            />
          </div>
        </div>
      );
    };

export default Home;