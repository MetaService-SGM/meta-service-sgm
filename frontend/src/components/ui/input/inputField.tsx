"use client";

import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputFieldProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  label: string;
  showPasswordToggle?: boolean;
}

export function InputField({
  type,
  id,
  value,
  onChange,
  disabled = false,
  placeholder,
  autoComplete,
  label,
  showPasswordToggle = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block font-normal font-medium text-black mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition cursor-pointer"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <IoMdEye className="text-[1.5rem]" />
            ) : (
              <IoMdEyeOff className="text-[1.5rem]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
