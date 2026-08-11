'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Location } from '@/services/locations';
import { leadService } from '@/services/lead.service';

type Props = {
    locations: Location[];
    selectedCity?: string;
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

const ContactSection = ({ locations, selectedCity = '' }: Props) => {
    // Capitalize the city for display in the form
    const capitalizedCity = selectedCity
        ? selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)
        : '';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            spaceType: 'Private Office', // Pre-select Private Office
            location: capitalizedCity, // Pre-select the city from URL
        },
    });

    const handleFormSubmit = async (data: LeadFormValues) => {
        try {
            await leadService.createLead({
                ...data,
                enquiredFor: 'Private Office Page',
            });
            toast.success('Thank you! We will contact you soon.');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="w-full px-6 md:px-12 mb-12 md:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left: Image with Overlay */}
                <div className="hidden lg:block relative h-[500px] lg:h-auto rounded-3xl overflow-hidden group">
                    <Image
                        src="/images/private-office/cta-1.png"
                        alt="Contact us"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0 mix-blend-multiply"
                        style={{
                            background: 'linear-gradient(180deg, #D7F09C 0%, #0C2E16 67.57%)',
                        }}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                        <h2 className="text-3xl md:text-5xl font-medium text-white mb-8 leading-tight max-w-lg">
                            <span className="text-primary-100">Fill out the form, and</span>{' '}
                            we&apos;ll get back to you soon.
                        </h2>

                        <div className="space-y-4">
                            <p className="text-[#D4E7A6] text-sm font-medium uppercase tracking-wider mb-2">
                                Or reach us directly:
                            </p>
                            <div className="flex items-center gap-3 text-white">
                                <div className="w-10 h-10 rounded-xl border border-primary-100 flex items-center justify-center text-primary-100 backdrop-blur-sm">
                                    <Phone size={18} />
                                </div>
                                <span className="text-xl md:text-2xl font-light tracking-wide">
                                    +91 7356735091
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-white">
                                <div className="w-10 h-10 rounded-xl border border-primary-100 flex items-center justify-center text-primary-100 backdrop-blur-sm">
                                    <Mail size={18} />
                                </div>
                                <span className="text-xl md:text-2xl font-light tracking-wide">
                                    coworkkerala@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-[#D4E7A6] rounded-3xl p-8 md:p-12">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        errors.name ? 'border-red-500' : 'border-none'
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
                                        errors.phone ? 'border-red-500' : 'border-none'
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
                                    errors.email ? 'border-red-500' : 'border-none'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-wider text-[#1A2818] uppercase">
                                    Space Type
                                </label>
                                <div className="relative">
                                    <select
                                        {...register('spaceType')}
                                        aria-label="Type of Space"
                                        className={`w-full px-4 py-3 rounded-lg bg-white border focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm appearance-none text-gray-600 ${
                                            errors.spaceType ? 'border-red-500' : 'border-none'
                                        }`}
                                    >
                                        <option value="">Select Spaces...</option>
                                        <option value="Private Office">Private Office</option>
                                        <option value="Dedicated Desk">Dedicated Desk</option>
                                        <option value="Hot Desk">Hot Desk</option>
                                        <option value="Virtual Office">Virtual Office</option>
                                        <option value="Meeting Room">Meeting Room</option>
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
                                    <p className="text-red-500 text-xs">
                                        {errors.spaceType.message}
                                    </p>
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
                                        errors.numberOfSeats ? 'border-red-500' : 'border-none'
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
                                        errors.location ? 'border-red-500' : 'border-none'
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
                                className="w-full px-4 py-3 rounded-lg bg-white border border-transparent focus:ring-2 focus:ring-[#1A2818]/20 focus:border-[#1A2818]/30 outline-none text-sm placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#4d898b] hover:bg-[#3b6874] text-white font-medium py-3 rounded-lg transition-colors duration-200 shadow-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
