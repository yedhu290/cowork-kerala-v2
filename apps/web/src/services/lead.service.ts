import apiClient from '@/lib/api-client';

export interface CreateLeadInput {
    name: string;
    email: string;
    phone: string;
    enquiredFor: string;
    spaceType: string;
    numberOfSeats?: number;
    location?: string;
    message?: string;
    date?: Date;
}

export const leadService = {
    createLead: async (data: CreateLeadInput) => {
        const response = await apiClient.post('/leads', data);
        return response.data;
    },
};
