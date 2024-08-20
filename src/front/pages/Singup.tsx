import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useSingup } from "../hooks/useSingup.ts";

import "../styles/pages/Singup.css";

const Singup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Passwords do not match",
        background: "#f9e2af",
        color: "#855eda",
        customClass: {
          popup: "my-pixel-alert",
        },
      });

      return;
    }
    await useSingup(email, password, navigate);
  };

  return (
    <section className="signup-container w-full h-screen flex items-center justify-center">
      <article className="flex flex-col  items-center bg-[#fbe9c3] rounded-lg">
        <h2 className="text-[#4A249D] m-4 text-2xl">Register</h2>
        <form
          className=" flex flex-col items-center justify-around w-full h-full text-[#4A249D] text-xl "
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>

          <input
            className="bg-[#009FBD] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>

          <input
            className="bg-[#009FBD] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="bg-[#009FBD] text-[#4A249D] placeholder-[#4A249D]/70 placeholder:text-sm"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="bg-[#855EDA] hover:bg-[#4A249D] text-[#fbe9c3] hover:text-[#F9E2AF] transition-all rounded-lg p-4 m-4"
            type="submit"
          >
            REGISTER
          </button>
          <p className="text- text-center m-4 ">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Singup;
