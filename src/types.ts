export interface Destination {
	id: number;
	name: string;
	date: string;
	lng: number;
	lat: number;
}

export interface Coordinates {
	lng: number;
	lat: number;
}

export type SortKey = "default" | "name" | "date";
export type SortDirection = "asc" | "desc";

export interface SortOptions {
	key: SortKey;
	direction: SortDirection;
}
