'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Location } from '@/services/locations';
import { leadService } from '@/services/lead.service';

type Props = {
    locations?: Location[];
    selectedCity?: string;
};

const leadSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    serviceType: z.string().min(1, 'Please select a service type'),
    location: z.string().min(1, 'Please select a city'),
    message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const ContactSection = ({ locations = [], selectedCity = '' }: Props) => {
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
            serviceType: '',
            location: capitalizedCity,
        },
    });

    const handleFormSubmit = async (data: LeadFormValues) => {
        try {
            await leadService.createLead({
                name: data.name,
                email: data.email,
                phone: data.phone,
                spaceType: data.serviceType, // Mapping serviceType to spaceType
                location: data.location,
                message: data.message,
                enquiredFor: 'Virtual Office Page',
            });
            toast.success('Thank you! We will contact you soon.');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section
            id="contact-form"
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-20"
        >
            {/* Left: Image with Overlay */}
            <div className="relative h-[400px] md:h-auto rounded-3xl overflow-hidden">
                <Image
                    src="/images/glimpse/group-discussion.png"
                    alt="Contact us"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                        Fill out the form, and we&apos;ll get back to you soon.
                    </h2>
                    <div className="flex flex-col gap-3 text-white/90">
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5" />
                            <span>+91 7356735091</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            <span>coworkkerala@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[#D4E7A6] rounded-3xl p-8 md:p-12">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase text-[#1A2818]">Name</label>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Insert your name"
                            className={`w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 ${
                                errors.name ? 'ring-2 ring-red-500' : ''
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase text-[#1A2818]">Mail</label>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Insert email address"
                            className={`w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 ${
                                errors.email ? 'ring-2 ring-red-500' : ''
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase text-[#1A2818]">
                                Service Type
                            </label>
                            <div className="relative">
                                <select
                                    {...register('serviceType')}
                                    className={`w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none text-zinc-600 appearance-none ${
                                        errors.serviceType ? 'ring-2 ring-red-500' : ''
                                    }`}
                                >
                                    <option value="">Select service</option>
                                    <option value="GST Registration">GST Registration</option>
                                    <option value="Business Registration">
                                        Business Registration
                                    </option>
                                    <option value="Mailing Address">Mailing Address</option>
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
                            {errors.serviceType && (
                                <p className="text-red-500 text-xs">{errors.serviceType.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase text-[#1A2818]">
                                Phone Number
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                placeholder="Insert phone number"
                                className={`w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 ${
                                    errors.phone ? 'ring-2 ring-red-500' : ''
                                }`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase text-[#1A2818]">
                            Location
                        </label>
                        <div className="relative">
                            <select
                                {...register('location')}
                                className={`w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none text-zinc-600 appearance-none ${
                                    errors.location ? 'ring-2 ring-red-500' : ''
                                }`}
                            >
                                <option value="">Select city</option>
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

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase text-[#1A2818]">
                            Message
                        </label>
                        <textarea
                            {...register('message')}
                            placeholder="Write your message..."
                            rows={4}
                            className="w-full rounded-xl border-none bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full rounded-xl bg-[#4A7A68] py-4 text-sm font-bold text-white transition-colors hover:bg-[#3d6656] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
