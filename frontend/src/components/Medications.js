import React, { useEffect, useState } from "react";
import API from "../api/api";

function Medications() {
	const [medications, setMedications] = useState([]);
	const [message, setMessage] = useState("");

	const fetchMedications = async () => {
		try {
			const res = await API.get("/api/medications/list");
			const medications = res.data.medications.map((elmt) => {
				return { _id: elmt.id, name: elmt.name };
			});
			setMessage("Requested successfully");
			setTimeout(() => setMessage(), 2000);  // hide msg after 2 sec
			setMedications(medications);
		} catch (error) {
			console.error(error);
			setMessage("Could not fetch medications");
		}
	};

	useEffect(() => {
		fetchMedications();
	}, []);

	const handleRefillRequest = async (medicationId) => {
		try {
			const res = await API.post("/api/medications/refill-request", {
				medicationId,
			});
			setMessage(res.data.message);
			fetchMedications();
		} catch (error) {
			console.error(error);
			setMessage("Error requesting refill");
		}
	};

	return (
		<div>
			<h2>Medications</h2>
			{message && <p>{message}</p>}
			<ul>
				{medications.map((med) => (
					<li key={med._id}>
						{med.name}{" "}
						<button onClick={() => handleRefillRequest(med._id)}>
							Request Refill
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Medications;
