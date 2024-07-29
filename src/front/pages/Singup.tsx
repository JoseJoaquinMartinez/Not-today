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
      alert("User created successfully");
      navigate(`/`);
    }
  };

  return (
    <section className="signup-container w-full h-screen flex items-center justify-center">
      <article className="signup-form w-[400px] h-[500px] bg-[#fbe9c3] rounded-lg">
        <form
          className="flex flex-col items-center justify-center w-full h-full text-[#4A249D]  "
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>

          <input
            className=""
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>

          <input
            className=""
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className=""
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </article>
    </section>
  );
};

export default Singup;
