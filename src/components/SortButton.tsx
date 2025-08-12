import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Button } from "@mui/material";
import React from "react";
import { SortKey, SortOptions } from "../types";

interface SortButtonProps {
	sortKey: SortKey;
	currentSortOptions: SortOptions;
	onClick: (key: SortKey) => void;
	children: React.ReactNode;
}

/**
 * @description A reusable button for sorting a list. It visually indicates
 * the current sort key and direction.
 */
const SortButton = ({
	sortKey,
	currentSortOptions,
	onClick,
	children,
}: SortButtonProps) => {
	const isActive = currentSortOptions.key === sortKey;

	const icon = isActive ? (
		currentSortOptions.direction === "asc" ? (
			<ArrowUpwardIcon />
		) : (
			<ArrowDownwardIcon />
		)
	) : undefined;

	return (
		<Button
			size="small"
			variant={isActive ? "contained" : "outlined"}
			onClick={() => onClick(sortKey)}
			endIcon={icon}
			aria-label={`Sort by ${children} ${
				isActive
					? `(${
							currentSortOptions.direction === "asc"
								? "ascending"
								: "descending"
					  })`
					: ""
			}`}
		>
			{children}
		</Button>
	);
};

export default SortButton;
