import { em } from "@mantine/core";
import { readLocalStorageValue } from "@mantine/hooks";
import { css, keyframes } from "styled-components";

import { COLOR_SCHEME_KEY } from "@constants/index";

/**
 * Helper function to convert from px to rem (1rem = 16px by browser default).
 * @param value number representing pixels.
 * @param omitUnit flag representing whether "rem" units should be ignored.
 * @returns string containing rem equivalent of pixel value.
 */
// export const rem = (value: number, omitUnit = false) => {
//   return value === 0 ? "0" : `${value / 16}${omitUnit === true ? "" : "rem"}`;
// };

// export const alpha = (color: string, opacity = 1) =>
//   `color-mix(in srgb, ${color} ${opacity * 100}%, rgb(0,0,0,0))`;

// Breakpoints (mobile up)
export const bp = {
  xs: `${em(576)}`,
  sm: `${em(768)}`,
  md: `${em(992)}`,
  lg: `${em(1200)}`,
  xl: `${em(1408)}`,
};

// Media queries
export const mq = {
  xs: `(min-width: ${bp.xs})`,
  sm: `(min-width: ${bp.sm})`,
  md: `(min-width: ${bp.md})`,
  lg: `(min-width: ${bp.lg})`,
  xl: `(min-width: ${bp.xl})`,
};

/*********************************************************************
CSS UTILITIES (similar to Sass mixins)
**********************************************************************/
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const alignItemsCenter = css`
  display: flex;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexSpBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const gridCenter = css`
  display: grid;
  place-items: center;
`;

export const absoluteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const pseudo = css`
  content: "";
  position: absolute;
`;

export const size = (width: string, height = width) => css`
  width: ${width};
  height: ${height};
`;

export const circle = (diameter: string) => css`
  ${size(diameter)}
  border-radius: 50%;
`;

export const marginInlineAuto = (width: string) => css`
  margin-inline: auto;
  width: ${width};
`;

export const clipBorderRadius = (borderRadius: string) => css`
  border-radius: ${borderRadius};
  overflow: hidden;
`;

export const lineClamp = (numOfLines: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${numOfLines};
  overflow: hidden;
  -webkit-box-orient: vertical;
`;

export const media = (bp: string) => `@media screen and (min-width: ${bp})`;

/**
 * Utility to use the light color when colorScheme is "light" and dark color when colorScheme is "dark"
 * @param colorScheme "light" or "dark" from local storage
 * @returns lightColor or darkColor depending on colorScheme
 */
export const lightDark = (
  colorScheme: string,
  lightColor: string,
  darkColor: string
) => {
  // console.log(colorScheme, "hello");

  if (colorScheme && colorScheme === "light") return lightColor;
  else if (colorScheme && colorScheme === "dark") return darkColor;
  else return lightColor;
};

export const revealFromBottom = keyframes`
  to {
    transform: translateY(0%) skewY(0);
}
`;

export const spin = keyframes`
  to {
    transform: rotate(360deg);
}`;
