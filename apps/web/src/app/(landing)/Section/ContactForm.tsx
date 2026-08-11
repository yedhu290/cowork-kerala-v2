'use client';

import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Location } from '@/services/locations';
import { leadService } from '@/services/lead.service';

type Props = {
    locations: Location[];
};

const leadSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    spaceType: z.string().min(1, 'Please select a space type'),
    location: z.string().min(1, 'Please select a city'),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const ContactForm = ({ locations }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
    });

    const onSubmit = async (data: LeadFormValues) => {
        try {
            await leadService.createLead({
                ...data,
                enquiredFor: 'General Enquiry', // Default for landing page form
            });
            toast.success('Thank you! We will contact you soon.');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="relative overflow-hidden bg-primary-100 py-12 md:py-16 lg:py-20">
            {/* Background wavy pattern */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                <Image
                    src="/images/landing/Group.svg"
                    alt="Background pattern"
                    fill
                    className="object-cover opacity-40"
                />
            </div>

            <div className="relative mx-auto px-8 md:px-[15%]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-zinc-900 mb-2">
                            Let us find your perfect Property
                        </h2>
                        <p className="text-base sm:text-lg text-zinc-700 mb-8">
                            Connect to a Cowork Expert now
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        placeholder="Name*"
                                        aria-label="Name"
                                        className={`h-12 w-full rounded-xl border-none bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                            errors.name ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        placeholder="Email*"
                                        aria-label="Email Address"
                                        className={`h-12 w-full rounded-xl border-none bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                            errors.email ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        {...register('phone')}
                                        type="tel"
                                        placeholder="Phone*"
                                        aria-label="Phone Number"
                                        className={`h-12 w-full rounded-xl border-none bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                            errors.phone ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <select
                                        {...register('spaceType')}
                                        aria-label="Type of Space"
                                        className={`h-12 w-full appearance-none rounded-xl border-none bg-white px-4 text-zinc-900 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                            errors.spaceType ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    >
                                        <option value="">Type of Space</option>
                                        <option value="Hot Desk">Hot Desk</option>
                                        <option value="Dedicated Desk">Dedicated Desk</option>
                                        <option value="Private Office">Private Office</option>
                                        <option value="Meeting Room">Meeting Room</option>
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
                                        ▼
                                    </span>
                                    {errors.spaceType && (
                                        <p className="text-red-500 text-xs mt-1 ml-1 absolute -bottom-5">
                                            {errors.spaceType.message}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <select
                                        {...register('location')}
                                        aria-label="Select City"
                                        className={`h-12 w-full appearance-none rounded-xl border-none bg-white px-4 text-zinc-900 focus:ring-2 focus:ring-primary-400 focus:outline-none ${
                                            errors.location ? 'ring-2 ring-red-500' : ''
                                        }`}
                                    >
                                        <option value="">Select City*</option>
                                        {locations.map((loc) => (
                                            <option key={loc.id || loc.name} value={loc.name}>
                                                {loc.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
                                        ▼
                                    </span>
                                    {errors.location && (
                                        <p className="text-red-500 text-xs mt-1 ml-1 absolute -bottom-5">
                                            {errors.location.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-12 w-full rounded-xl bg-primary-400 text-white font-medium hover:bg-primary-500 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-4 hidden md:flex justify-center lg:justify-end">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-4 border-white overflow-hidden shadow-lg">
                            <Image
                                src="/images/landing/cta.png"
                                alt="Coworking expert"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
