import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Coordinates } from "../types";

interface DestinationFormProps {
	coordinates: Coordinates;
	onSubmit: (name: string, date: string) => void;
	onCancel: () => void;
}

/**
 * @description A form for entering the name and date of a new destination.
 * Automatically focuses the first input field on render.
 */
const DestinationForm = ({
	coordinates,
	onSubmit,
	onCancel,
}: DestinationFormProps) => {
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	const nameInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		nameInputRef.current?.focus();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !date) return;
		onSubmit(name, date);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ backgroundColor: "white" }}
		>
			<Stack spacing={2}>
				<Typography variant="h6">Add New Destination</Typography>
				<TextField
					inputRef={nameInputRef}
					label="Destination Name"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					fullWidth
				/>
				<TextField
					label="Date of Trip"
					type="date"
					variant="outlined"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					InputLabelProps={{ shrink: true }}
					required
					fullWidth
				/>
				<Typography variant="body2" color="text.secondary">
					Lat: {coordinates.lat}, Lng: {coordinates.lng}
				</Typography>
				<Stack direction="row" spacing={1} justifyContent="flex-end">
					<Button onClick={onCancel}>Cancel</Button>
					<Button type="submit" variant="contained">
						Add Destination
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default DestinationForm;
