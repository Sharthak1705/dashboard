const SignUp = ({ toggleForm }) => {
    const handleSignUp = (e) => {
        e.preventDefault();
        
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const user = { username, email, password };
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        toggleForm(); 
    };

    return (
        <form onSubmit={handleSignUp}>
            <h3 className="text-2xl font-bold text-center text-gray-300 mb-4">Sign Up </h3>
            <label className="block text-white mb-2">Username</label>
            <input
                type="text"
                name="username"
                placeholder="Enter a username"
                className="w-full p-2 mb-4 bg-black/30 text-white rounded focus:outline-none"
                required
            />
            <label className="block text-white mb-2">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-4 bg-black/30 text-white rounded focus:outline-none"
                required
            />
            <label className="block text-white mb-2">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 mb-4 bg-black/30 text-white rounded focus:outline-none"
                required
            />
            <label className="block text-white mb-2">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                className="w-full p-2 mb-4 bg-black/30 text-white rounded focus:outline-none"
                required
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Sign Up</button>

            <p className="text-center text-white mt-4">
                Already have an account?{' '}
                <span className="text-green-500 cursor-pointer" onClick={toggleForm}>
                    Login
                </span>
            </p>
        </form>
    );
};

export default SignUp;