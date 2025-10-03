import React, { useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./SignUp";
import backgroundImage from "../../assets/image.jpg";

const Form = ({ handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-gray-900 bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-96 p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} handleLogin={handleLogin} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Form;