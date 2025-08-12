import { Box, Divider, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { Coordinates, Destination, SortKey, SortOptions } from "../types";
import DestinationCard from "./DestinationCard";
import DestinationForm from "./DestinationForm";
import SortButton from "./SortButton";

interface SidebarProps {
	destinations: Destination[];
	newCoord: Coordinates | null;
	sortOptions: SortOptions;
	onAddDestination: (name: string, date: string) => void;
	onDeleteDestination: (id: string, name: string) => void;
	onCancelNewDestination: () => void;
	onSort: (key: SortKey) => void;
}

/**
 * @description Renders the content for the application's sidebar, including
 * the main header, the new destination form, and the list of saved destinations.
 */
const Sidebar = ({
	destinations,
	newCoord,
	sortOptions,
	onAddDestination,
	onDeleteDestination,
	onCancelNewDestination,
	onSort,
}: SidebarProps) => {
	return (
		<>
			<Toolbar />
			<Box sx={{ p: 2, height: "100%", overflowY: "auto" }}>
				<Stack spacing={3}>
					<header>
						<Typography variant="h4" component="h1" color="primary">
							Vacation Planner
						</Typography>
						<Typography color="text.secondary">
							Click the map to add a destination.
						</Typography>
					</header>
					<Divider />

					{newCoord && (
						<Paper elevation={3} sx={{ p: 2 }}>
							<DestinationForm
								coordinates={newCoord}
								onSubmit={onAddDestination}
								onCancel={onCancelNewDestination}
							/>
						</Paper>
					)}

					<Stack spacing={2}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography variant="h6">My Destinations</Typography>
							<Stack direction="row" spacing={1}>
								<SortButton
									sortKey="date"
									currentSortOptions={sortOptions}
									onClick={onSort}
								>
									Date
								</SortButton>
								<SortButton
									sortKey="name"
									currentSortOptions={sortOptions}
									onClick={onSort}
								>
									Name
								</SortButton>
							</Stack>
						</Stack>

						{destinations.length > 0 ? (
							destinations.map((dest) => (
								<DestinationCard
									key={dest.id}
									destination={dest}
									onDelete={onDeleteDestination}
								/>
							))
						) : (
							<Box sx={{ textAlign: "center", py: 5 }}>
								<Typography color="text.secondary">
									Your saved destinations will appear here.
								</Typography>
							</Box>
						)}
					</Stack>
				</Stack>
			</Box>
		</>
	);
};

export default Sidebar;
