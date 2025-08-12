import { Box, CircularProgress } from "@mui/material";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import { Coordinates, Destination } from "../types";

interface MapComponentProps {
	destinations: Destination[];
	newCoord: Coordinates | null;
	onMapClick: (coords: Coordinates) => void;
	mapRef: React.MutableRefObject<mapboxgl.Map | null>;
}

/**
 * @description Renders the Mapbox map and manages all map-related side effects,
 * including initialization and marker management for saved and temporary destinations.
 */
const MapComponent = ({
	destinations,
	newCoord,
	onMapClick,
	mapRef,
}: MapComponentProps) => {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const tempMarkerRef = useRef<mapboxgl.Marker | null>(null);
	const savedMarkersRef = useRef<mapboxgl.Marker[]>([]);
	const onMapClickRef = useRef(onMapClick);
	const [isMapLoaded, setIsMapLoaded] = useState(false);

	// Keep the click handler ref updated without causing the map to re-initialize
	useEffect(() => {
		onMapClickRef.current = onMapClick;
	}, [onMapClick]);

	// Initialize map only once
	useEffect(() => {
		if (mapRef.current || !mapContainer.current) return;

		mapRef.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/outdoors-v12",
			center: [-98.5795, 39.8283],
			zoom: 3.5,
		});

		mapRef.current.on("load", () => setIsMapLoaded(true));

		mapRef.current.on("click", (e) => {
			// Check if the click originated from a marker. If so, do nothing.
			const target = e.originalEvent.target as HTMLElement;
			if (target.closest(".mapboxgl-marker")) {
				return;
			}

			onMapClickRef.current({
				lng: parseFloat(e.lngLat.lng.toFixed(4)),
				lat: parseFloat(e.lngLat.lat.toFixed(4)),
			});
		});

		return () => {
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [mapRef]);

	// Effect for saved destination markers
	useEffect(() => {
		if (!mapRef.current) return;
		savedMarkersRef.current.forEach((marker) => marker.remove());
		savedMarkersRef.current = [];

		destinations.forEach((dest) => {
			const marker = new mapboxgl.Marker({ color: "#00796b" })
				.setLngLat([dest.lng, dest.lat])
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }).setHTML(
						`<h3>${dest.name}</h3><p>${dest.date}</p>`
					)
				)
				.addTo(mapRef.current!);

			savedMarkersRef.current.push(marker);
		});
	}, [destinations, mapRef]);

	// Effect for the temporary marker
	useEffect(() => {
		if (!mapRef.current) return;
		if (tempMarkerRef.current) {
			tempMarkerRef.current.remove();
		}
		if (newCoord) {
			tempMarkerRef.current = new mapboxgl.Marker({ color: "grey" })
				.setLngLat([newCoord.lng, newCoord.lat])
				.addTo(mapRef.current);
		}
	}, [newCoord, mapRef]);

	return (
		<>
			{!isMapLoaded && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(255, 255, 255, 0.7)",
						zIndex: 1,
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<div
				ref={mapContainer}
				style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
			/>
		</>
	);
};

export default MapComponent;
