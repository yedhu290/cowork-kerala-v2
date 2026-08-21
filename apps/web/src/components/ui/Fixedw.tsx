import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
};

/**
 * Centred page container.
 *
 * Page-level usage passes `container mx-auto md:px-8` on top of the base. Note
 * `container` is not redundant: between the sm and md breakpoints it caps the
 * width at 640px, before `md:max-w-[80vw]` takes over. Dropping it widens
 * tablet layouts.
 *
 * Conventions for page content:
 *   header wrapper   container mx-auto md:px-8 flex flex-col
 *   content wrapper  ...same, plus gap-12 (marketing) or gap-8 pt-4 (long-form
 *                    text), and mb-12 md:mb-24 to space it off the footer
 *   pages ending in a full-bleed section instead wrap <Footer /> in
 *   <div className="mt-12 md:mt-24"> so the spacing still applies
 */

const Fixedw = ({ children, className }: Props) => {
    return (
        <div className={twMerge('px-6 md:px-0 md:max-w-[80vw] mx-auto', className)}>{children}</div>
    );
};

export default Fixedw;
