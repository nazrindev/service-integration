import { useState, useEffect } from "react";
import { login as loginApi } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/validation";
import RequiredMark from "../../components/RequiredMark";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const [sessionMessage, setSessionMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("sessionExpired")) {
      setSessionMessage("Session expired. Please login again.");
      sessionStorage.removeItem("sessionExpired");
    }
  }, []);

  function handleInputOnchange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  }

  const submitForm = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await loginApi(formData.username, formData.password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setLoginError(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Invalid username or password",
      );
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 focus:outline-none ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-blue-500"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
          Login
        </h1>

        <form className="space-y-4" onSubmit={submitForm} noValidate>
          {sessionMessage && (
            <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {sessionMessage}
            </p>
          )}

          {loginError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {loginError}
            </p>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
              <RequiredMark />
            </label>
            <input
              name="username"
              type="text"
              value={formData.username}
              placeholder="Enter your username"
              className={inputClass("username")}
              onChange={handleInputOnchange}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
              <RequiredMark />
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleInputOnchange}
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
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
