const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8091/api/v1';

export interface City {
    _id: string;
    name: string;
    description: string;
    image: string;
    isActive: boolean;
}

export interface Workspace {
    id: string;
    spaceId: string;
    spaceName: string;
    spaceType: string;
    city: City;
    spaceCategory: string;
    shortDescription?: string;
    longDescription?: string;
    amenities: string[];
    pricing: {
        hotDesk?: number;
        dedicatedDesk?: number;
        privateOffice?: number;
    };
    location: {
        address?: string;
        pincode?: string;
        latitude?: number;
        longitude?: number;
    };
    contact: {
        name?: string;
        email?: string;
        phone?: string;
    };
    images: string[];
    status: 'active' | 'inactive' | 'pending';
    isFeatured: boolean;
    features?: {
        wifi: string;
        seats: string;
        area: string;
    };
}

export interface GetWorkspacesParams {
    city?: string;
    page?: number;
    limit?: number;
    search?: string;
}

export interface WorkspacesResponse {
    success: boolean;
    data: Workspace[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface WorkspaceResponse {
    success: boolean;
    data: Workspace;
}

export const getWorkspaces = async (params: GetWorkspacesParams = {}): Promise<WorkspacesResponse | null> => {
    try {
        const queryParams = new URLSearchParams();
        if (params.city) queryParams.append('city', params.city);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);

        const url = `${API_BASE_URL}/spaces${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await fetch(url, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return null;
    }
};

export const getWorkspaceById = async (id: string): Promise<WorkspaceResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/spaces/${id}`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching workspace:', error);
        return null;
    }
};

export const getFeaturedWorkspaces = async (): Promise<WorkspacesResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/spaces/featured`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching featured workspaces:', error);
        return null;
    }
};
