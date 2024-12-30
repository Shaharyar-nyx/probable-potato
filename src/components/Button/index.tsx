import React from "react";

import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({ children, loading = false, icon, ...props }) => {
  return (
    <button {...props}>
      {!loading ? (
        <>
          <span>{children}</span>
          {icon !== undefined && icon}
        </>
      ) : (
        <span>Loading...</span>
      )}
    </button>
  );
};

export default Button;
