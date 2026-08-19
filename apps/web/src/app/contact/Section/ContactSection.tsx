'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { leadService } from '@/services/lead.service';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    enquiryType: z.enum(['Looking for Space', 'Listing Space']),
    message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass = (hasError: boolean) =>
    `h-12 w-full rounded-xl border bg-white px-4 text-zinc-900 placeholder:text-zinc-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-colors ${
        hasError ? 'border-red-500' : 'border-zinc-200'
    }`;

const ContactSection = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const handleFormSubmit = async (data: ContactFormValues) => {
        try {
            const { enquiryType, ...rest } = data;
            await leadService.createLead({
                ...rest,
                spaceType: enquiryType,
                enquiredFor: 'Contact Page',
            });
            toast.success('Thank you! We will contact you soon.');
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <section className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Form card */}
            <div className="lg:col-span-3">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-primary-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-700">
                                Send An Enquiry
                            </span>
                        </div>
                        <h2 className="heading-subsection text-zinc-900">
                            Tell us what you need
                        </h2>
                        <p className="leading-relaxed text-zinc-600">
                            Share a few details and our Kerala team will get back within one working
                            day with options and pricing that fit.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="Name"
                                    aria-label="Name"
                                    className={inputClass(!!errors.name)}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <input
                                    {...register('phone')}
                                    type="tel"
                                    placeholder="Phone"
                                    aria-label="Phone"
                                    className={inputClass(!!errors.phone)}
                                />
                                {errors.phone && (
                                    <p className="text-xs text-red-500">{errors.phone.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                className={inputClass(!!errors.email)}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <select
                                {...register('enquiryType')}
                                aria-label="Enquiry type"
                                className={inputClass(!!errors.enquiryType)}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select enquiry type
                                </option>
                                <option value="Looking for Space">Looking for a space</option>
                                <option value="Listing Space">Listing my space</option>
                            </select>
                            {errors.enquiryType && (
                                <p className="text-xs text-red-500">{errors.enquiryType.message}</p>
                            )}
                        </div>

                        <textarea
                            {...register('message')}
                            placeholder="Your message"
                            rows={6}
                            aria-label="Message"
                            className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isSubmitting ? 'Submitting…' : 'Submit enquiry'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Photo */}
            <div className="relative min-h-[18rem] w-full overflow-hidden rounded-3xl border border-zinc-200 lg:col-span-2">
                <Image
                    src="/images/glimpse/open-office.png"
                    alt="A bright, open CoWork Kerala workspace in Kerala"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                />
            </div>
        </section>
    );
};

export default ContactSection;
