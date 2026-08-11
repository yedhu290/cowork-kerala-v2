import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

type Props = {
    options: Array<{ value: string; label: string }>;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = (props: Props) => {
    return (
        <div
            className={twMerge(
                'relative w-48 h-12 rounded-lg bg-teal-300 text-lg transition-all focus-within:ring-2 focus-within:ring-zinc-900/10',
                props.className
            )}
        >
            <select
                className="w-full h-full appearance-none bg-transparent outline-none px-4 pr-10 cursor-pointer text-inherit font-inherit rounded-inherit"
                value={props.value ?? ''}
                onChange={props.onChange}
            >
                {props.placeholder && (
                    <option value="" disabled>
                        {props.placeholder}
                    </option>
                )}
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none size-4" />
        </div>
    );
};

export default SelectInput;
