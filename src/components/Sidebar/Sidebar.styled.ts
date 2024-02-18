import { rem } from "@mantine/core";
import styled from "styled-components";

import {
  alignItemsCenter,
  flexColumn,
  lightDark,
  size,
} from "@styles/Utilities.styled";


interface Props {
  $colorScheme: "light" | "dark";
}

export const StyledSidebar = styled.nav<Props>`
  ${flexColumn}
  height: 100%;

  .navbarMain {
    flex: 1;
  }

  .header {
    padding-bottom: var(--mantine-spacing-md);
    margin-bottom: calc(var(--mantine-spacing-md) * 1.5);
  }

  .footer {
    padding-top: var(--mantine-spacing-sm);
    margin-top: var(--mantine-spacing-md);
    border-top: ${({ $colorScheme }) => `1px solid
      ${lightDark(
        $colorScheme,
        "var(--mantine-color-gray-3)",
        "var(--mantine-color-dark-4)"
      )}`};
  }

  .link {
    ${alignItemsCenter}
    text-decoration: none;
    font-size: var(--mantine-font-size-sm);
    color: ${({ $colorScheme }) =>
      `${lightDark(
        $colorScheme,
        "var(--mantine-color-gray-7)",
        "var(--mantine-color-dark-1)"
      )}`};
    padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
    border-radius: var(--mantine-radius-sm);
    font-weight: 500;

    &:hover {
      background-color: ${({ $colorScheme }) =>
        `${lightDark(
          $colorScheme,
          "var(--mantine-color-gray-0)",
          "var(--mantine-color-dark-6)"
        )}`};
      color: ${({ $colorScheme }) =>
        `${lightDark(
          $colorScheme,
          "var(--mantine-color-black)",
          "var(--mantine-color-white)"
        )}`};

      .linkIcon {
        color: ${({ $colorScheme }) =>
          `${lightDark(
            $colorScheme,
            "var(--mantine-color-black)",
            "var(--mantine-color-white)"
          )}`};
      }
    }

    &[data-active] {
      &,
      &:hover {
        background-color: var(--mantine-color-blue-light);
        color: var(--mantine-color-blue-light-color);

        .linkIcon {
          color: var(--mantine-color-blue-light-color);
        }
      }
    }
  }

  .linkIcon {
    color: ${({ $colorScheme }) =>
      `${lightDark(
        $colorScheme,
        "var(--mantine-color-gray-6)",
        "var(--mantine-color-dark-2)"
      )}`};
    margin-right: var(--mantine-spacing-sm);
    ${size(rem(25))}
  }
`;
