import { useState } from "react";
import { useLogin } from "../hooks/useLogin.ts";
import { useNavigate } from "react-router-dom";

import "../styles/pages/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    await useLogin(email, password, navigate);
  };

  return (
    <section className="login-container w-full h-screen flex items-center justify-center">
      <article className="flex flex-col  items-center bg-[#fbe9c3] rounded-lg">
        <h2 className="text-[#4A249D] m-4 text-2xl">Login</h2>
        <form
          className=" flex flex-col items-center justify-around w-full h-full text-[#4A249D] text-xl m-5 "
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>

          <input
            className="bg-[#009FBD] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm m-3"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>

          <input
            className="bg-[#009FBD] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm m-3"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            className="bg-[#855EDA] hover:bg-[#4A249D] text-[#fbe9c3] hover:text-[#F9E2AF] transition-all rounded-lg p-4 m-4"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </article>
    </section>
  );
};

export default Login;
