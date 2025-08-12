/**
 * @description Formats a date string (YYYY-MM-DD) into a more readable format.
 * e.g., "2025-08-12" becomes "August 12, 2025".
 * Handles potential timezone issues by treating the date as UTC.
 * @param dateString The date string in YYYY-MM-DD format.
 * @returns A formatted, human-readable date string.
 */
export const formatDate = (dateString: string): string => {
	const parts = dateString.split("-");
	if (parts.length !== 3) {
		return dateString; // Return original string if format is unexpected
	}
	const year = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
	const day = parseInt(parts[2], 10);

	const date = new Date(Date.UTC(year, month, day));

	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC", // Ensure consistent output regardless of user's timezone
	});
};
