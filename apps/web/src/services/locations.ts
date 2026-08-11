const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1';

export interface Location {
    id: string;
    name: string;
    image: string;
}

export const getLocations = async (): Promise<Location[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/locations`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            return data.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching locations:', error);
        return [];
    }
};
