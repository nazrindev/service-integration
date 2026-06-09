import { useState } from "react";
import styles from "./login.module.css";
import { login as loginApi } from "../../services/authService";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleInputOnchange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(formData.username, formData.password);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Login
        </h1>

        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              name="username"
              type="username"
              placeholder="Enter your username"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              onChange={handleInputOnchange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInputOnchange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
