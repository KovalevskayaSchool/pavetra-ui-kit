import { forwardRef, useState } from "react";
import { EyeOutline, EyeOffOutline } from "@symblight/pavetra-icons";

import { Button } from "../Button";
import { Input, type InputProps } from "./Input";

export const Password = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
      setShow((prev) => !prev);
    };

    return (
      <Input
        ref={ref}
        {...props}
        type={show ? "text" : "password"}
        suffix={
          <Button
            variant="inline"
            size="small"
            onClick={handleClick}
            icon={show ? <EyeOutline /> : <EyeOffOutline />}
          />
        }
      />
    );
  }
);

Password.displayName = "Password";
