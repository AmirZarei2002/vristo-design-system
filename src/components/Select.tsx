import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const selectStyles = cva(
    'w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm font-semibold text-black !outline-none focus:border-primary focus:ring-transparent dark:border-[#17263c] dark:bg-[#121e32] dark:text-white-dark dark:focus:border-primary',
    {
        variants: {
            size: {
                small: 'py-1.5 text-xs',
                large: 'py-2.5 text-bas',
            },
            isError: {
                true: "border-danger bg-danger/[0.08] text-danger placeholder-danger/70 focus:border-danger"
            },
            isSuccess: {
                true: "border-success bg-success/[0.08] text-success placeholder-success/70 focus:border-success"
            }
        },
        defaultVariants: {
            size: 'large',
        },
    }
);

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement>, VariantProps<typeof selectStyles> {
    options?: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, options, size, isError, isSuccess, ...props }, ref) => {
    return (
        <select
            ref={ref}
            className={clsx(selectStyles({ size, isError, isSuccess }), className)}
            {...props}
        >
            {options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

export default Select
