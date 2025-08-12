import MenuIcon from "@mui/icons-material/Menu";
import {
	Alert,
	AppBar,
	Box,
	Drawer,
	IconButton,
	Snackbar,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import mapboxgl from "mapbox-gl";
import { useCallback, useRef, useState } from "react";
import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";
import { useDestinations } from "./hooks/useDestinations";
import { Coordinates } from "./types";

const drawerWidth = 400;

// Set the Mapbox access token
const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
if (accessToken) {
	mapboxgl.accessToken = accessToken;
} else {
	console.error(
		"Mapbox access token is not set. Please create a .env file and add REACT_APP_MAPBOX_ACCESS_TOKEN."
	);
}

/**
 * @description The main application component. It manages the overall layout,
 * state orchestration between the map and the sidebar, and user interactions.
 */
function App() {
	const {
		destinations,
		addDestination,
		deleteDestination,
		handleSort,
		sortOptions,
	} = useDestinations();
	const [newCoord, setNewCoord] = useState<Coordinates | null>(null);
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [snackbarInfo, setSnackbarInfo] = useState<{
		open: boolean;
		message: string;
	}>({ open: false, message: "" });
	const mapRef = useRef<mapboxgl.Map | null>(null);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleAddDestination = (name: string, date: string) => {
		if (!newCoord) return;
		const newDest = addDestination({
			name,
			date,
			lng: newCoord.lng,
			lat: newCoord.lat,
		});
		setNewCoord(null);
		setSnackbarInfo({
			open: true,
			message: `Added "${newDest.name}" to destinations!`,
		});
	};

	const handleDeleteDestination = useCallback(
		(id: string, name: string) => {
			deleteDestination(id);
			setSnackbarInfo({
				open: true,
				message: `Removed "${name}" from destinations.`,
			});
		},
		[deleteDestination]
	);

	const handleMapClick = useCallback((coords: Coordinates) => {
		setNewCoord(coords);
		setSidebarOpen(true);
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setSidebarOpen(!isSidebarOpen)}
						edge="start"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Vacation Planner
					</Typography>
				</Toolbar>
			</AppBar>

			<Drawer
				variant="temporary"
				open={isSidebarOpen}
				onClose={() => setSidebarOpen(false)}
				ModalProps={{
					hideBackdrop: !isMobile,
					disableEnforceFocus: !isMobile,
				}}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
						maxWidth: "100vw",
					},
				}}
			>
				<Sidebar
					destinations={destinations}
					newCoord={newCoord}
					sortOptions={sortOptions}
					onAddDestination={handleAddDestination}
					onDeleteDestination={handleDeleteDestination}
					onCancelNewDestination={() => setNewCoord(null)}
					onSort={handleSort}
				/>
			</Drawer>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					height: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Toolbar />
				<Box sx={{ flexGrow: 1, position: "relative" }}>
					<MapComponent
						destinations={destinations}
						newCoord={newCoord}
						onMapClick={handleMapClick}
						mapRef={mapRef}
					/>
				</Box>
			</Box>
			<Snackbar
				open={snackbarInfo.open}
				autoHideDuration={4000}
				onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
					severity="success"
					sx={{ width: "100%" }}
				>
					{snackbarInfo.message}
				</Alert>
			</Snackbar>
		</Box>
	);
}

export default App;
