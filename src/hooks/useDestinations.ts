import { useCallback, useEffect, useMemo, useState } from "react";
import { Destination, SortKey, SortOptions } from "../types";

/**
 * @description Manages the state and persistence of vacation destinations.
 * @returns An object containing the destinations list and functions to manage it.
 */
export const useDestinations = () => {
	const [destinations, setDestinations] = useState<Destination[]>(() => {
		try {
			const saved = localStorage.getItem("vacationDestinations");
			return saved ? JSON.parse(saved) : [];
		} catch (error) {
			console.error("Failed to parse destinations from localStorage", error);
			return [];
		}
	});

	const [sortOptions, setSortOptions] = useState<SortOptions>({
		key: "default",
		direction: "asc",
	});

	useEffect(() => {
		localStorage.setItem("vacationDestinations", JSON.stringify(destinations));
	}, [destinations]);

	const addDestination = (destination: Omit<Destination, "id">) => {
		const newDestination: Destination = {
			id: crypto.randomUUID(),
			...destination,
		};
		setDestinations((prev) => [...prev, newDestination]);
		return newDestination;
	};

	const deleteDestination = useCallback((idToDelete: string) => {
		setDestinations((prev) => prev.filter((dest) => dest.id !== idToDelete));
	}, []);

	const handleSort = useCallback((key: SortKey) => {
		setSortOptions((prev) => {
			if (prev.key === key) {
				return {
					...prev,
					direction: prev.direction === "asc" ? "desc" : "asc",
				};
			}
			return { key, direction: key === "date" ? "desc" : "asc" };
		});
	}, []);

	const sortedDestinations = useMemo(() => {
		const sortableDestinations = [...destinations];
		if (sortOptions.key === "default") {
			return destinations;
		}
		sortableDestinations.sort((a, b) => {
			if (sortOptions.key === "name") {
				return a.name.localeCompare(b.name);
			}
			if (sortOptions.key === "date") {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			}
			return 0;
		});
		if (sortOptions.direction === "desc") {
			return sortableDestinations.reverse();
		}
		return sortableDestinations;
	}, [destinations, sortOptions]);

	return {
		destinations: sortedDestinations,
		addDestination,
		deleteDestination,
		handleSort,
		sortOptions,
	};
};
