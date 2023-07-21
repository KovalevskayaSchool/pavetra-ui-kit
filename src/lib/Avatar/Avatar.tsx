import { HTMLAttributes, useMemo, forwardRef, useId } from "react";
import cn from "classnames";

import styles from "./Avatar.module.css";

type AvatarSize = "large" | "medium" | "small" | number;

export interface AvatarProps extends HTMLAttributes<SVGElement> {
  className?: string;
  name?: string;
  imageSrc?: string | null;
  avatarColor?: string | null;
  size?: AvatarSize;
  shape?: "circle" | "rect";
  ref?: React.Ref<SVGSVGElement> | null;
  svgChildren?: React.ReactNode;
}

export const Avatar = forwardRef<SVGSVGElement, AvatarProps>(
  (
    {
      size,
      svgChildren,
      className,
      name,
      imageSrc,
      avatarColor,
      shape = "circle",
      ...props
    },
    ref
  ) => {
    const getName = (value: string | undefined): string[] => {
      if (!value || value.trim() === "") {
        return [""];
      }
      const [firstName, lastName] = value.trim().split(" ");

      const firstChar = firstName && firstName.length > 0 ? firstName[0] : "";
      const lastChar = lastName && lastName.length > 0 ? lastName[0] : "";

      return [firstChar.toUpperCase(), lastChar.toLocaleUpperCase()];
    };

    const getSize = (value: AvatarSize | undefined) => {
      if (typeof value === "number") {
        return value;
      }

      switch (value) {
        case "large": {
          return 36;
        }
        case "medium": {
          return 26;
        }
        case "small": {
          return 20;
        }
        default: {
          return 26;
        }
      }
    };
    const sizeSVG = useMemo(() => getSize(size), [size]);
    const nameSVG = useMemo(() => getName(name), [name]);

    const maskId = useId();
    const renderSecond = () => {
      return (
        <svg
          ref={ref}
          className={cn(styles["avatar"], className)}
          fill="none"
          viewBox={`0 0 171 171`}
          style={{ width: `${sizeSVG * 2}px` }}
          {...props}
        >
          <mask
            id={maskId}
            x="0"
            y="0"
            style={{ height: `171px`, width: `171px` }}
          >
            <path
              d="M2.27953 37.4296C3.35111 18.3184 18.4117 3.25785 37.5229 2.18626C51.4828 1.40352 68.5179 0.730469 85.8237 0.730469C103.13 0.730469 120.165 1.40352 134.125 2.18627C153.236 3.25785 168.296 18.3184 169.368 37.4296C170.151 51.3895 170.824 68.4247 170.824 85.7305C170.824 103.036 170.151 120.071 169.368 134.031C168.296 153.143 153.236 168.203 134.125 169.275C120.165 170.057 103.13 170.73 85.8237 170.73C68.5179 170.73 51.4828 170.057 37.5228 169.275C18.4116 168.203 3.35111 153.143 2.27953 134.031C1.49678 120.071 0.82373 103.036 0.82373 85.7305C0.82373 68.4247 1.49678 51.3895 2.27953 37.4296Z"
              fill="white"
            />
          </mask>
          <g mask={`url(#${maskId})`}>
            {imageSrc && (
              <image
                x="0"
                y="0"
                height="100%"
                width="100%"
                className={styles["avatar__image"]}
                xlinkHref={imageSrc}
                preserveAspectRatio="xMidYMid slice"
              ></image>
            )}
            <rect
              x="0"
              y="0"
              width="171"
              height="171"
              data-fill={!imageSrc}
              className={styles["avatar__rect"]}
              fill={!imageSrc ? String(avatarColor || "gray") : "none"}
            />
            <g>
              {!imageSrc && (
                <text
                  style={{ fontSize: `${sizeSVG * 2}px` }}
                  x="50%"
                  y="50%"
                  fill="white"
                  stroke="white"
                  textAnchor="middle"
                  dy=".3em"
                >
                  {nameSVG.join("")}
                </text>
              )}
            </g>
            {svgChildren}
          </g>
        </svg>
      );
    };
    if (shape === "rect") {
      return renderSecond();
    }
    return (
      <svg
        ref={ref}
        aria-hidden="true"
        className={cn(styles["avatar"], className)}
        data-visualcompletion="ignore-dynamic"
        role="none"
        style={{ height: `${sizeSVG * 2}px`, width: `${sizeSVG * 2}px` }}
        {...props}
      >
        <mask id={maskId}>
          <circle cx={sizeSVG} cy={sizeSVG} fill="white" r={sizeSVG}></circle>
        </mask>
        <g mask={`url(#${maskId})`}>
          {imageSrc && (
            <image
              x="0"
              y="0"
              height="100%"
              width="100%"
              className={styles["avatar__image"]}
              xlinkHref={imageSrc}
              style={{ height: `${sizeSVG * 2}px`, width: `${sizeSVG * 2}px` }}
              preserveAspectRatio="xMidYMid slice"
            ></image>
          )}
          <circle
            cx={sizeSVG}
            cy={sizeSVG}
            r={sizeSVG}
            data-fill={!imageSrc}
            className={styles["avatar__circle"]}
            fill={!imageSrc ? String(avatarColor || "gray") : "none"}
          ></circle>
          <g>
            {!imageSrc && (
              <text
                style={{ fontSize: `${sizeSVG - 2}px` }}
                x="50%"
                y="52%"
                fill="white"
                stroke="white"
                strokeWidth={1}
                textAnchor="middle"
                dy=".3em"
              >
                {nameSVG.join("")}
              </text>
            )}
          </g>

          {svgChildren}
        </g>
      </svg>
    );
  }
);

Avatar.displayName = "Avatar";
