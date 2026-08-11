import Image from 'next/image';
import React from 'react';

type Props = {
    location: string;
    imageUrl: string;
    onClick?: () => void;
};

const LocationCircle = ({ location, imageUrl, onClick }: Props) => {
    return (
        <div onClick={onClick} className="flex flex-col gap-3 items-center group cursor-pointer">
            <div className="relative size-20 sm:size-24 md:size-28 rounded-full bg-zinc-100 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={location}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 96px, 112px"
                    />
                )}
            </div>
            <p className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                {location ?? 'Unknown'}
            </p>
        </div>
    );
};

export default LocationCircle;
