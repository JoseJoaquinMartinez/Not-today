import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Singup.css";

const Singup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const { email, password } = form;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      navigate(`/`);
    }
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
            Already have an account? <a href="/">Sign in</a>
          </p>
        </form>
      </article>
    </section>
  );
};

export default Singup;
