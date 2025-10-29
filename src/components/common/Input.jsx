import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      value,
      onChange,
      onKeyPress,
      placeholder = "",
      disabled = false,
      type = "text",
      error = null,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`input-wrapper ${className}`}>
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          className={`input ${error ? "input--error" : ""}`}
          {...props}
        />
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
