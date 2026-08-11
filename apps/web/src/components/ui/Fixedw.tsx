import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const Fixedw = ({ children, className }: Props) => {
    return (
        <div className={twMerge('px-6 md:px-0 md:max-w-[80vw] mx-auto', className)}>{children}</div>
    );
};

export default Fixedw;
