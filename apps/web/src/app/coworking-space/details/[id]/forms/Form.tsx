'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { leadService } from '@/services/lead.service';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    spaceType: z.string().min(1, 'Space type is required'),
    numberOfSeats: z.coerce.number().min(1, 'At least 1 seat is required').optional(),
    location: z.string().optional(),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
    spaceName?: string;
    cityName?: string;
}

const Form = ({ spaceName, cityName }: FormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            spaceType: '',
            numberOfSeats: 1,
            location: cityName || '',
            message: '',
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await leadService.createLead({
                ...data,
                enquiredFor: spaceName ? `Workspace: ${spaceName}` : 'Workspace Page',
            });
            toast.success('Lead submitted successfully');
            reset();
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit lead');
        }
    };

    return (
        <div className="md:col-span-3">
            <div className="rounded-3xl bg-primary-100 p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                                Name
                            </label>
                            <input
                                {...register('name')}
                                className="h-12 w-full rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                                placeholder="Jane Smith"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                                Phone
                            </label>
                            <input
                                {...register('phone')}
                                className="h-12 w-full rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                                placeholder="0123 456 789"
                            />
                            {errors.phone && (
                                <p className="text-xs text-red-500">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                            Email
                        </label>
                        <input
                            {...register('email')}
                            className="h-12 w-full rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                            placeholder="jane@framer.com"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                                Space Type
                            </label>
                            <div className="relative">
                                <select
                                    {...register('spaceType')}
                                    className="h-12 w-full appearance-none rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                                >
                                    <option value="">Select Spaces...</option>
                                    <option value="Hot Desk">Hot Desk</option>
                                    <option value="Dedicated Desk">Dedicated Desk</option>
                                    <option value="Private Office">Private Office</option>
                                    <option value="Meeting Room">Meeting Room</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg
                                        className="h-4 w-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                            {errors.spaceType && (
                                <p className="text-xs text-red-500">{errors.spaceType.message}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                                Number of Seats
                            </label>
                            <input
                                type="number"
                                {...register('numberOfSeats')}
                                className="h-12 w-full rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                                placeholder="1"
                                min={1}
                            />
                            {errors.numberOfSeats && (
                                <p className="text-xs text-red-500">
                                    {errors.numberOfSeats.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                            Location
                        </label>
                        <div className="relative">
                            <select
                                {...register('location')}
                                className="h-12 w-full appearance-none rounded-lg bg-white px-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                            >
                                <option value="">Select...</option>
                                <option value="Trivandrum">Trivandrum</option>
                                <option value="Kochi">Kochi</option>
                                <option value="Calicut">Calicut</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg
                                    className="h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wide text-zinc-800">
                            Message
                        </label>
                        <textarea
                            {...register('message')}
                            className="h-32 w-full resize-none rounded-lg bg-white p-4 outline-none focus:ring-2 focus:ring-primary-400/20"
                            placeholder="Write your message"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full rounded-lg bg-[#4D898B] py-3 text-lg font-medium text-white transition-colors hover:bg-primary-500 disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
