'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown, IoIosMenu, IoIosClose } from 'react-icons/io';
import { getLocations, Location } from '@/services/locations';

/**
 * Static fallback so the location dropdowns always list Kerala's cities even if
 * the locations API is slow or unavailable. Slugs are derived as
 * name.toLowerCase() to match the /coworking-space/[city] and
 * /virtual-office/[city] routes.
 */
const FALLBACK_CITIES = ['Kochi', 'Trivandrum', 'Calicut', 'Thrissur'];

/**
 * `initialLocations` is supplied by the server wrapper (`HeaderServer`) so the
 * nav renders with the real cities on first paint and skips a client-side
 * refetch on every page. When it's omitted (or empty), the header falls back to
 * fetching them itself, then to `FALLBACK_CITIES`.
 */
type HeaderProps = {
    initialLocations?: Location[];
};

const Header = ({ initialLocations }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [locations, setLocations] = useState<Location[]>(initialLocations ?? []);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
    const desktopNavRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Server already provided locations — no client fetch needed.
        if (initialLocations && initialLocations.length > 0) return;

        let cancelled = false;
        const fetchLocations = async () => {
            const locs = await getLocations();
            if (!cancelled) setLocations(locs);
        };
        fetchLocations();
        return () => {
            cancelled = true;
        };
    }, [initialLocations]);

    // Close the desktop dropdown when clicking outside the nav or pressing Escape.
    useEffect(() => {
        if (!activeDropdown) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setActiveDropdown(null);
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [activeDropdown]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setMobileExpandedItem(null);
    };

    const toggleMobileExpand = (item: string) => {
        setMobileExpandedItem(mobileExpandedItem === item ? null : item);
    };

    // Prefer live locations; fall back to the static city list so the dropdown
    // is never empty (e.g. before the API responds, or if it's unreachable).
    const cityList =
        locations.length > 0
            ? locations.map((loc) => ({ id: loc.id || loc.name, name: loc.name }))
            : FALLBACK_CITIES.map((name) => ({ id: name, name }));

    // Dropdown menu component for desktop
    const DropdownMenu = ({
        basePath,
        isOpen,
        onSelect,
    }: {
        basePath: string;
        isOpen: boolean;
        onSelect?: () => void;
    }) => {
        if (!isOpen) return null;

        return (
            <div className="absolute top-full left-0 pt-1 w-48 z-50">
                <div className="bg-white rounded-xl shadow-lg border border-zinc-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                        href={basePath}
                        onClick={onSelect}
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                    >
                        All Locations
                    </Link>
                    <div className="border-t border-zinc-100 my-1" />
                    {cityList.map((loc) => (
                        <Link
                            key={loc.id || loc.name}
                            href={`${basePath}/${loc.name.toLowerCase()}`}
                            onClick={onSelect}
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
        <header className="flex items-center justify-between py-6 relative">
            <Link href="/" className="relative w-32 md:w-40 h-10 md:h-12 z-50">
                <Image
                    src="/logo/logo.png"
                    alt="Cowork Kerala"
                    fill
                    sizes="160px"
                    className="object-contain object-left"
                    priority
                />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex" ref={desktopNavRef}>
                <ul className="flex items-center gap-8 text-base font-medium text-zinc-800">
                    {/* Coworking Spaces with dropdown */}
                    <li
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('coworking')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveDropdown('coworking')}
                            aria-haspopup="true"
                            aria-expanded={activeDropdown === 'coworking'}
                            className="hover:text-primary-600 flex cursor-pointer items-center gap-1 transition-colors py-2"
                        >
                            <span>Coworking Spaces</span>
                            <IoIosArrowDown
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                    activeDropdown === 'coworking' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <DropdownMenu
                            basePath="/coworking-space"
                            isOpen={activeDropdown === 'coworking'}
                            onSelect={() => setActiveDropdown(null)}
                        />
                    </li>

                    {/* Virtual Office with dropdown */}
                    <li
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('virtual')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveDropdown('virtual')}
                            aria-haspopup="true"
                            aria-expanded={activeDropdown === 'virtual'}
                            className="hover:text-primary-600 flex cursor-pointer items-center gap-1 transition-colors py-2"
                        >
                            <span>Virtual Office</span>
                            <IoIosArrowDown
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 ${
                                    activeDropdown === 'virtual' ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <DropdownMenu
                            basePath="/virtual-office"
                            isOpen={activeDropdown === 'virtual'}
                            onSelect={() => setActiveDropdown(null)}
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
                                        {cityList.map((loc) => (
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
                                        {cityList.map((loc) => (
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
                                        {cityList.map((loc) => (
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
        </header>
    );
};

export default Header;
