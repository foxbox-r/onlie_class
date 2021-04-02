import React from 'react';
import "./CustomInput.scss";

const CustomInput = ({
    type,
    className,
    value,
    setValue,
    placeholder,
    ref,
    maxLength,
    onClick
}) => {

    return (
        <>
            <input 
                autoComplete='off'
                type={type}
                className={"CustomInput "+className}
                value={value}
                onChange={e=>setValue(e.target.value)}
                placeholder={placeholder}
                ref={ref}
                maxLength={maxLength}
                onClick={onClick}
            />
        </>
    )
}

export default CustomInput;