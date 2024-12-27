import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import API from "../api/api";

function Navbar() {
	const handleLogout = async () => {
		try {
			const res = await API.delete("/auth/logout");
		} catch (error) {}
		setUser(null);
		window.location.href = "/login";
	};

	const { user, setUser } = useGlobalContext();

	return (
		<nav>
			<ul class="nav-bar-links-container">
				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
				{user && (
					<>
						<li>
							<Link to="/medications">Medications</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
