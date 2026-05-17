import React from "react";

const Button = ({ children, onClick, disabled, className }: { children: React.ReactNode; onClick?: React.MouseEventHandler<HTMLButtonElement>; disabled?: boolean; className?: string }): JSX.Element => {

    return (
        <button type="button" className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );

}

export default Button;