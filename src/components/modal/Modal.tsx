import React, { useRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const modalStyles = cva(
    "absolute top-0 w-fit h-fit sm:top-[25%] left-[50%] translate-x-[-50%] p-4 bg-white rounded-none sm:rounded-md shadow-md",
    {
        variants: {
            size: {
                min: "min-w-fit",
                max: "min-w-max",
                fit: "min-w-fit",
            },
        },
        defaultVariants: {},
    }
);

interface ModalProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof modalStyles> {
    open: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    className,
    open,
    onClose,
    size,
    ...props
}) => {
    const classes = modalStyles({ size });

    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    if (!open || !onClose) return null;

    return (
        <div className="fixed z-[1400] inset-0">
            <div
                className="opacity-[1] fixed flex items-center justify-center right-0 bottom-0 top-0 left-0 z-[-1] bg-[#00000080]"
                onClick={handleOverlayClick} />
            <div ref={modalRef} className={clsx(classes, className)} {...props} />
        </div>
    )
};