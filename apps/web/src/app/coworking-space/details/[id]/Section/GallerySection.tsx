'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Workspace } from '@/services/workspace.service';

interface GallerySectionProps {
    workspace: Workspace;
}

const GallerySection = ({ workspace }: GallerySectionProps) => {
    const mainImage = workspace.images?.[0] || '/images/thumb-1.png';
    const galleryImages = workspace.images?.slice(1, 5) || [];
    const allImages = workspace.images?.length > 0 ? workspace.images : ['/images/thumb-1.png'];

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openPreview = (index: number) => {
        setCurrentImageIndex(index);
        setIsPreviewOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closePreview = () => {
        setIsPreviewOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closePreview();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    };

    return (
        <>
            <section>
                <div className="md:mt-12 flex flex-col gap-2 relative">
                    <div className="rounded-full bg-primary-50 size-12 md:size-18 absolute bottom-8 -left-4 md:bottom-12 md:-left-8 -z-20"></div>
                    <h1 className="text-2xl md:text-5xl font-medium">{workspace.spaceName}</h1>
                    <div className="flex gap-2 items-center">
                        <IoLocationOutline className="text-sm md:text-lg" />
                        <span className="text-sm md:text-lg text-slate-700">
                            {workspace.location?.address
                                ? `${workspace.location.address}, ${workspace.city.name}`
                                : workspace.city.name}
                        </span>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-12 w-full md:mt-8 mt-4 gap-3 md:gap-4 lg:gap-6">
                    {/* Main Image - Full height on desktop */}
                    <div
                        className="col-span-12 md:col-span-7 cursor-pointer group"
                        onClick={() => openPreview(0)}
                    >
                        <div className="relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[500px] xl:h-[560px] overflow-hidden rounded-xl md:rounded-3xl lg:rounded-4xl">
                            <Image
                                src={mainImage}
                                alt={workspace.spaceName}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 58vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                    </div>

                    {/* Side Images Grid */}
                    <div className="col-span-12 md:col-span-5 grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                        {galleryImages.length > 0
                            ? galleryImages.map((img, idx) => (
                                  <div
                                      key={idx}
                                      className="cursor-pointer group relative h-20 sm:h-24 md:h-[190px] lg:h-[238px] xl:h-[268px] overflow-hidden rounded-lg md:rounded-2xl lg:rounded-3xl"
                                      onClick={() => openPreview(idx + 1)}
                                  >
                                      <Image
                                          src={img}
                                          alt={`${workspace.spaceName} - Image ${idx + 2}`}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                                          sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                  </div>
                              ))
                            : Array(4)
                                  .fill(null)
                                  .map((_, idx) => (
                                      <div
                                          key={idx}
                                          className="cursor-pointer group relative h-20 sm:h-24 md:h-[190px] lg:h-[238px] xl:h-[268px] overflow-hidden rounded-lg md:rounded-2xl lg:rounded-3xl"
                                          onClick={() => openPreview(0)}
                                      >
                                          <Image
                                              src="/images/thumb-1.png"
                                              alt={`${workspace.spaceName} placeholder`}
                                              fill
                                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                                              sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                      </div>
                                  ))}
                    </div>
                </div>
            </section>

            {/* Image Preview Modal */}
            {isPreviewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={closePreview}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                >
                    {/* Close Button */}
                    <button
                        onClick={closePreview}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Close preview"
                    >
                        <X size={24} />
                    </button>

                    {/* Previous Button */}
                    {allImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-2 sm:left-4 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
                        </button>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-[90vw] h-[70vh] sm:w-[85vw] sm:h-[75vh] md:w-[80vw] md:h-[80vh] max-w-6xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={allImages[currentImageIndex]}
                            alt={`${workspace.spaceName} - Preview ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Next Button */}
                    {allImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-2 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} className="sm:w-8 sm:h-8" />
                        </button>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                        {currentImageIndex + 1} / {allImages.length}
                    </div>

                    {/* Thumbnail Navigation (hidden on mobile) */}
                    {allImages.length > 1 && (
                        <div className="hidden sm:flex absolute bottom-16 left-1/2 -translate-x-1/2 gap-2 max-w-[80vw] overflow-x-auto px-4 py-2">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                                        idx === currentImageIndex
                                            ? 'ring-2 ring-white scale-110'
                                            : 'opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GallerySection;
