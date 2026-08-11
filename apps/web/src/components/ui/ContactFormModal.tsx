'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Location } from '@/services/locations';
import { leadService } from '@/services/lead.service';

type ContactFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    locations: Location[];
};

const leadSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    spaceType: z.string().min(1, 'Please select a space type'),
    numberOfSeats: z.number().min(1, 'At least 1 seat is required').optional(),
    location: z.string().min(1, 'Please select a city'),
    message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const ContactFormModal = ({ isOpen, onClose, onSubmit, locations }: ContactFormModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
    });

    const handleFormSubmit = async (data: LeadFormValues) => {
        try {
            await leadService.createLead({
                ...data,
                enquiredFor: 'General Enquiry (Modal)',
            });
            toast.success('Thank you! We will contact you soon.');
            reset();
            onSubmit?.();
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl p-6 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} className="text-[#1A2818]" />
                </button>

                <h2 className="text-2xl md:text-3xl font-semibold text-[#1A2818] mb-6">
                    Get in Touch
                </h2>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                                Name
                            </label>
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="Jane Smith"
                                aria-label="Name"
                                className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                                Phone
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                placeholder="0123 456 789"
                                aria-label="Phone Number"
                                className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="jane@framer.com"
                            aria-label="Email Address"
                            className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                                Space Type
                            </label>
                            <div className="relative">
                                <select
                                    {...register('spaceType')}
                                    aria-label="Type of Space"
                                    className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm appearance-none text-gray-600 ${
                                        errors.spaceType ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select Spaces...</option>
                                    <option value="Hot Desk">Hot Desk</option>
                                    <option value="Dedicated Desk">Dedicated Desk</option>
                                    <option value="Private Office">Private Office</option>
                                    <option value="Meeting Room">Meeting Room</option>
                                    <option value="Virtual Office">Virtual Office</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg
                                        width="10"
                                        height="6"
                                        viewBox="0 0 10 6"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 1L5 5L9 1"
                                            stroke="#9CA3AF"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {errors.spaceType && (
                                <p className="text-red-500 text-xs">{errors.spaceType.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                                Number of Seats
                            </label>
                            <input
                                {...register('numberOfSeats', { valueAsNumber: true })}
                                type="number"
                                placeholder="1"
                                aria-label="Number of Seats"
                                className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 ${
                                    errors.numberOfSeats ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.numberOfSeats && (
                                <p className="text-red-500 text-xs">
                                    {errors.numberOfSeats.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                            Location
                        </label>
                        <div className="relative">
                            <select
                                {...register('location')}
                                aria-label="Select City"
                                className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm appearance-none text-gray-600 ${
                                    errors.location ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select...</option>
                                {locations.map((loc) => (
                                    <option key={loc.id || loc.name} value={loc.name}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 1L5 5L9 1"
                                        stroke="#9CA3AF"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.location && (
                            <p className="text-red-500 text-xs">{errors.location.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                            Message
                        </label>
                        <textarea
                            {...register('message')}
                            rows={4}
                            placeholder="Write your message"
                            aria-label="Message"
                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white hover:bg-gray-100 text-[#1A2818] font-medium py-3 rounded-lg transition-colors duration-200 border border-[#1A2818]/20"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-primary-400 hover:bg-primary-500 text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactFormModal;
