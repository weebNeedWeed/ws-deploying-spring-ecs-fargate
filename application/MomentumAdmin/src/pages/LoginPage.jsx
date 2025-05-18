import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Neo-Brutalist background shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-neo-yellow rounded-lg transform rotate-12 z-0"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-neo-blue rounded-lg transform -rotate-12 z-0"></div>
      <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-neo-red rounded-lg transform rotate-6 z-0"></div>

      <div className="neo-card w-full max-w-md z-10 bg-white transform rotate-1">
        <h1 className="text-6xl mb-8 text-center transform -rotate-2">
          ADMIN LOGIN
        </h1>

        {error && (
          <div className="bg-neo-red border-4 border-neo-black p-4 mb-6 text-white font-bold text-center transform -rotate-1">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-display mb-2 transform -rotate-1"
            >
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="neo-input w-full"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xl font-display mb-2 transform -rotate-1"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neo-input w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="neo-button w-full text-2xl py-4 transform rotate-1"
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          <p className="font-body">Use admin / password to login</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
