import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function Login() {
	const { setUser } = useGlobalContext();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await API.post("/auth/login", { email, password });
			setUser({
				id: res.data.user.id,
				firstName: res.data.user.first_name,
				lastName: res.data.user.last_name,
				email: res.data.user.email,
				token: res.data.user.token,
			});
			navigate("/medications");
		} catch (error) {
			try {
				setMessage(error.response.data.frontend_msg || "Error logging in");
			} catch (err) {
				setMessage("Error logging in");
			}
		}
	};

	return (
		<div className="form-container">
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<p>{message && message}</p>
		</div>
	);
}

export default Login;
