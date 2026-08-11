import { z } from 'zod';

export const pricingSchema = z.object({
  hotDesk: z.coerce
    .number()
    .positive('Hot Desk price must be a positive number'),
  dedicatedDesk: z.coerce
    .number()
    .positive('Dedicated Desk price must be a positive number'),
  privateOffice: z.coerce
    .number()
    .positive('Private Office price must be a positive number'),
});

export const locationSchema = z.object({
  address: z.string().optional().or(z.literal('')),
  pincode: z.string().optional().or(z.literal('')),
  landmark: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  googleMapsUrl: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .optional()
    .or(z.literal('')),
});

export const spaceSchema = z.object({
  spaceName: z.string().optional().or(z.literal('')),
  spaceType: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  spaceCategory: z.string().optional().or(z.literal('')),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  amenities: z.array(z.string()),
  pricing: pricingSchema,
  location: locationSchema.optional(),
  contact: contactSchema.optional(),
  images: z.array(z.string().url()),
  status: z.enum(['active', 'inactive', 'pending']),
  priority: z.coerce.number().int().min(0).max(100).default(0),
  isFeatured: z.boolean().optional(),
});

export type SpaceFormData = z.infer<typeof spaceSchema>;

export const spaceTypeOptions = [
  { label: 'Coworking Space', value: 'Coworking Space' },
  { label: 'Virtual Office', value: 'Virtual Office' },
  { label: 'Private Office', value: 'Private Office' },
  { label: 'Meeting Room', value: 'Meeting Room' },
];

export const cityOptions = [
  { label: 'Kochi', value: 'Kochi' },
  { label: 'Trivandrum', value: 'Trivandrum' },
  { label: 'Kozhikode', value: 'Kozhikode' },
  { label: 'Thrissur', value: 'Thrissur' },
  { label: 'Kannur', value: 'Kannur' },
];

export const categoryOptions = [
  { label: 'Budget', value: 'Budget' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Luxury', value: 'Luxury' },
];
