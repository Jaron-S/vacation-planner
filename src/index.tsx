import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// A light theme for the application
const tealTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#00796b", // Teal
		},
		secondary: {
			main: "#fbc02d",
		},
		background: {
			default: "#f5f5f5", // Off-white background
			paper: "#ffffff",
		},
	},
	typography: {
		h4: {
			fontWeight: 700,
		},
	},
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={tealTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
