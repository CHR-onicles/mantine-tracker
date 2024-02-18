import { rem } from "@mantine/core";
import styled from "styled-components";

import { flexColumn, lightDark, size } from "@styles/Utilities.styled";


interface Props {
  $colorScheme: "light" | "dark";
}

export const StyledSidebar = styled.nav<Props>`
  ${flexColumn}

  .navbarMain {
    flex: 1;
  }

  .link {
    display: flex;
    align-items: center;
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
