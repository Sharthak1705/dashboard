import { useNavigate } from "react-router-dom";

const Login = ({ toggleForm, handleLogin }) => {
  const navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const emailOrUsername = e.target.emailOrUsername.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    const user = users.find(
      (u) =>
        (u.email === emailOrUsername || u.username === emailOrUsername) &&
        u.password === password
    );

    if (user) {
      alert(`Welcome, ${user.username}!`);
      navigate("/dashboard"); 
    } else {
     {error && (
   <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">
        {error}
      </div>
      )}
    }
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h3 className="text-2xl font-bold text-center text-gray-100 mb-4">Login</h3>
      <label className="block text-gray-200 mb-2">Email or Username</label>
      <input
        type="text"
        name="emailOrUsername"
        placeholder="Email or Username"
        className="w-full p-2 mb-4 bg-black/30 text-white rounded focus:outline-none"
        required
      />
      <label className="block text-gray-200 mb-2">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 bg-black/30 text-white rounded focus:outline-none mb-5"
        required
      />
      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
        Login
      </button>

      <p className="text-center text-white mt-4 ">
        Don't have an account?{" "}
        <span className="text-green-500 cursor-pointer" onClick={toggleForm}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;