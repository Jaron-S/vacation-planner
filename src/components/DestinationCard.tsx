import DeleteIcon from "@mui/icons-material/Delete";
import {
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import { memo } from "react";
import { Destination } from "../types";

interface DestinationCardProps {
	destination: Destination;
	onDelete: (id: string) => void;
}

/**
 * @description A memoized component that displays a single destination's details.
 */
const DestinationCard = ({ destination, onDelete }: DestinationCardProps) => {
	return (
		<Card variant="outlined">
			<CardContent>
				<Typography variant="h6" component="div">
					{destination.name}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{destination.date}
				</Typography>
				<Typography variant="body2">
					Lat: {destination.lat}, Lng: {destination.lng}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "flex-end" }}>
				<IconButton
					aria-label="delete"
					onClick={() => onDelete(destination.id)}
				>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default memo(DestinationCard);
