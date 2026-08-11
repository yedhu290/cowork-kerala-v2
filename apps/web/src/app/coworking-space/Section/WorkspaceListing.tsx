'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ArrowRight, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Workspace } from '@/services/workspace.service';
import { Location } from '@/services/locations';
import ContactFormModal from '@/components/ui/ContactFormModal';
import { useRouter, useSearchParams } from 'next/navigation';

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
        workspace.images.length > 0 ? workspace.images[0] : '/images/placeholder.svg';

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
                            <span
                                aria-hidden="true"
                                className="grid size-8 place-items-center rounded-full bg-black text-white transition-all duration-300 group-hover:bg-gray-800 group-hover:scale-110"
                            >
                                <ArrowRight size={16} className="text-sm" />
                            </span>
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
                            <IndianRupee size={16} />
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
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

const WorkspaceListing = ({ workspaces, locations, pagination }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    // Use server-side pagination data
    const currentPage = pagination?.page || 1;
    const totalPages = pagination?.totalPages || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleGetQuote = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Stop event bubbling
        setIsModalOpen(true);
    };

    if (!workspaces || workspaces.length === 0) {
        return (
            <section className="w-full py-12 text-center">
                <p className="text-gray-500">
                    {searchQuery
                        ? `No workspaces found matching "${searchQuery}"`
                        : 'No workspaces found matching your criteria.'}
                </p>
            </section>
        );
    }

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <section className="w-full">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {workspaces.map((ws) => (
                    <WorkspaceCard key={ws.id} workspace={ws} onGetQuote={handleGetQuote} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={18} />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className="px-3 py-2 text-gray-500"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            const pageNum = page as number;
                            const isActive = pageNum === currentPage;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                    aria-label={`Go to page ${pageNum}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            <ContactFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                locations={locations}
            />
        </section>
    );
};

export default WorkspaceListing;
