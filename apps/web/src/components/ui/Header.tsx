'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosMenu, IoIosClose } from 'react-icons/io';
import { getLocations, Location } from '@/services/locations';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            const locs = await getLocations();
            setLocations(locs);
        };
        fetchLocations();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setMobileExpandedItem(null);
    };

    const toggleMobileExpand = (item: string) => {
        setMobileExpandedItem(mobileExpandedItem === item ? null : item);
    };

    // Dropdown menu component for desktop
    const DropdownMenu = ({ basePath, isOpen }: { basePath: string; isOpen: boolean }) => {
        if (!isOpen || locations.length === 0) return null;

        return (
            <div className="absolute top-full left-0 pt-1 w-48 z-50">
                <div className="bg-white rounded-xl shadow-lg border border-zinc-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                        href={basePath}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                        All Locations
                    </Link>
                    <div className="border-t border-zinc-100 my-1" />
                    {locations.map((loc) => (
                        <Link
                            key={loc.id || loc.name}
                            href={`${basePath}/${loc.name.toLowerCase()}`}
                            className="block px-4 py-2 text-sm text-zinc-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        >
                            {loc.name}
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex items-center justify-between py-6 relative">
            <Link href="/" className="relative w-32 md:w-40 h-10 md:h-12 z-50">
                <Image
                    src="/logo/logo.png"
                    alt="Cowork Kerala"
                    fill
                    className="object-contain object-left"
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
                <ul className="flex items-center gap-8 text-base font-medium text-zinc-800">
                    {/* Coworking Spaces with dropdown */}
                    <li
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('coworking')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            href="/coworking-space"
                            className="hover:text-primary-600 flex items-center gap-1 transition-colors py-2"
                        >
                            <span>Coworking Spaces</span>
                            <IoIosArrowDown
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                    activeDropdown === 'coworking' ? 'rotate-180' : ''
                                }`}
                            />
                        </Link>
                        <DropdownMenu
                            basePath="/coworking-space"
                            isOpen={activeDropdown === 'coworking'}
                        />
                    </li>

                    {/* Virtual Office with dropdown */}
                    <li
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('virtual')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            href="/virtual-office"
                            className="hover:text-primary-600 flex items-center gap-1 transition-colors py-2"
                        >
                            <span>Virtual Office</span>
                            <IoIosArrowDown
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                    activeDropdown === 'virtual' ? 'rotate-180' : ''
                                }`}
                            />
                        </Link>
                        <DropdownMenu
                            basePath="/virtual-office"
                            isOpen={activeDropdown === 'virtual'}
                        />
                    </li>

                    {/* Private Office with dropdown */}
                    {/* <li
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('private')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            href="/private-office"
                            className="hover:text-primary-600 flex items-center gap-1 transition-colors py-2"
                        >
                            <span>Private Office</span>
                            <IoIosArrowDown
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                    activeDropdown === 'private' ? 'rotate-180' : ''
                                }`}
                            />
                        </Link>
                        <DropdownMenu
                            basePath="/private-office"
                            isOpen={activeDropdown === 'private'}
                        />
                    </li> */}

                    {/* Temporary simple link for Private Office */}
                    <li>
                        <Link
                            href="/private-office"
                            className="hover:text-primary-600 flex items-center gap-1 transition-colors"
                        >
                            <span>Private Office</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/about" className="hover:text-primary-600 transition-colors">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-primary-600 transition-colors">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden z-50 p-2 text-zinc-800"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <IoIosClose size={32} /> : <IoIosMenu size={32} />}
            </button>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 fade-in duration-200 overflow-y-auto">
                    <nav>
                        <ul className="flex flex-col gap-2 text-lg font-medium text-zinc-800">
                            {/* Coworking Spaces with expandable locations */}
                            <li>
                                <button
                                    className="flex items-center justify-between w-full border-b border-zinc-100 pb-4"
                                    onClick={() => toggleMobileExpand('coworking')}
                                >
                                    <span>Coworking Spaces</span>
                                    <IoIosArrowDown
                                        size={16}
                                        className={`text-zinc-400 transition-transform duration-200 ${
                                            mobileExpandedItem === 'coworking' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {mobileExpandedItem === 'coworking' && (
                                    <div className="pl-4 py-2 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <Link
                                            href="/coworking-space"
                                            className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                            onClick={toggleMenu}
                                        >
                                            All Locations
                                        </Link>
                                        {locations.map((loc) => (
                                            <Link
                                                key={loc.id || loc.name}
                                                href={`/coworking-space/${loc.name.toLowerCase()}`}
                                                className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                                onClick={toggleMenu}
                                            >
                                                {loc.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>

                            {/* Virtual Office with expandable locations */}
                            <li>
                                <button
                                    className="flex items-center justify-between w-full border-b border-zinc-100 pb-4"
                                    onClick={() => toggleMobileExpand('virtual')}
                                >
                                    <span>Virtual Office</span>
                                    <IoIosArrowDown
                                        size={16}
                                        className={`text-zinc-400 transition-transform duration-200 ${
                                            mobileExpandedItem === 'virtual' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {mobileExpandedItem === 'virtual' && (
                                    <div className="pl-4 py-2 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <Link
                                            href="/virtual-office"
                                            className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                            onClick={toggleMenu}
                                        >
                                            All Locations
                                        </Link>
                                        {locations.map((loc) => (
                                            <Link
                                                key={loc.id || loc.name}
                                                href={`/virtual-office/${loc.name.toLowerCase()}`}
                                                className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                                onClick={toggleMenu}
                                            >
                                                {loc.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>

                            {/* Private Office with expandable locations */}
                            {/* <li>
                                <button
                                    className="flex items-center justify-between w-full border-b border-zinc-100 pb-4"
                                    onClick={() => toggleMobileExpand('private')}
                                >
                                    <span>Private Office</span>
                                    <IoIosArrowDown
                                        size={16}
                                        className={`text-zinc-400 transition-transform duration-200 ${
                                            mobileExpandedItem === 'private' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {mobileExpandedItem === 'private' && (
                                    <div className="pl-4 py-2 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <Link
                                            href="/private-office"
                                            className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                            onClick={toggleMenu}
                                        >
                                            All Locations
                                        </Link>
                                        {locations.map((loc) => (
                                            <Link
                                                key={loc.id || loc.name}
                                                href={`/private-office/${loc.name.toLowerCase()}`}
                                                className="block py-2 text-base text-zinc-600 hover:text-primary-600"
                                                onClick={toggleMenu}
                                            >
                                                {loc.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li> */}

                            {/* Temporary simple link for Private Office */}
                            <li>
                                <Link
                                    href="/private-office"
                                    className="flex items-center justify-between border-b border-zinc-100 pb-4"
                                    onClick={toggleMenu}
                                >
                                    <span>Private Office</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="block border-b border-zinc-100 pb-4"
                                    onClick={toggleMenu}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="block border-b border-zinc-100 pb-4"
                                    onClick={toggleMenu}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Header;
