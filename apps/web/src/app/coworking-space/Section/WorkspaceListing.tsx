'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, DollarSign, ArrowRight } from 'lucide-react';
import { Workspace } from '@/services/workspace.service';
import { Location } from '@/services/locations';
import ContactFormModal from '@/components/ui/ContactFormModal';

const WorkspaceCard = ({
    workspace,
    onGetQuote,
}: {
    workspace: Workspace;
    onGetQuote: (e: React.MouseEvent) => void;
}) => {
    // Determine price to display
    const displayPrice = workspace.pricing.privateOffice
        ? `From ₹${workspace.pricing.privateOffice} /month`
        : workspace.pricing.dedicatedDesk
        ? `From ₹${workspace.pricing.dedicatedDesk} /month`
        : workspace.pricing.hotDesk
        ? `From ₹${workspace.pricing.hotDesk} /day`
        : 'Contact for pricing';

    // Determine image to display
    const displayImage =
        workspace.images.length > 0 ? workspace.images[0] : '/images/placeholder.jpg';

    return (
        <Link href={`/coworking-space/details/${workspace.id}`} className="block h-full group">
            <article className="overflow-hidden rounded-2xl border border-gray-200 md:border-0 bg-white flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                        <Image
                            src={displayImage}
                            alt={workspace.spaceName}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                        {/* Optional: Add content here if needed, or keep the existing design */}
                    </div>
                    <div className="absolute bottom-0 left-0">
                        <div className="flex items-center justify-between gap-4 rounded-tr-xl bg-primary-100/90 px-4 py-2 backdrop-blur">
                            <h3 className="text-sm font-semibold sm:text-base">
                                {workspace.spaceName}
                            </h3>
                            <button
                                aria-label="View workspace"
                                className="grid size-8 place-items-center rounded-full bg-black text-white transition-all duration-300 hover:bg-gray-800 hover:scale-110 active:scale-95"
                            >
                                <ArrowRight size={16} className="text-sm" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col grow p-4 sm:p-5 space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-3 grow">
                        {workspace.shortDescription || workspace.longDescription}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm">
                            <Users size={16} className="text-primary-600" />
                            <span>1 - 10 Persons</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <DollarSign size={16} className="text-primary-600" />
                            <span>{displayPrice}</span>
                        </div>
                        <button
                            onClick={onGetQuote}
                            className="w-full sm:w-auto rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-200 transition-colors active:scale-95 z-10 relative"
                        >
                            Get quote
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
};

type Props = {
    workspaces: Workspace[];
    locations: Location[];
};

const WorkspaceListing = ({ workspaces, locations }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGetQuote = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Stop event bubbling
        setIsModalOpen(true);
    };

    if (!workspaces || workspaces.length === 0) {
        return (
            <section className="w-full py-12 text-center">
                <p className="text-gray-500">No workspaces found matching your criteria.</p>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {workspaces.map((ws) => (
                    <WorkspaceCard key={ws.id} workspace={ws} onGetQuote={handleGetQuote} />
                ))}
            </div>
            <ContactFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                locations={locations}
            />
        </section>
    );
};

export default WorkspaceListing;
