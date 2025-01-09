import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = ({ className = "", ...props }: TextareaProps) => {
  const baseStyles =
    "block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  const classes = `${baseStyles} ${className}`;

  return <textarea className={classes} {...props} />;
};
