import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

function Register() {
	const { setUser } = useGlobalContext();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const res = await API.post("/auth/register", {
				firstName,
				lastName,
				email,
				password,
			});
			setMessage(res.data.frontend_msg);
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
				setMessage(error.response.data.frontend_msg || "Error registering user");
			} catch (err) {
				setMessage("Error registering user");
			}
		}
	};

	return (
		<div className="form-container">
			<h2>Register</h2>
			<form class="registration-form" onSubmit={handleRegister}>
				<div class="fullname-container">
					<span>
						<label>First Name:</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</span>
					<span>
						<label>Last Name:</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</span>
				</div>
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
				<button type="submit">Register</button>
			</form>
			<p>{message && message}</p>
		</div>
	);
}

export default Register;
