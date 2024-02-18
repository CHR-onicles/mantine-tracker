import { UnstyledButton } from "@mantine/core";
import styled from "styled-components";

import { bp, lightDark, media } from "@styles/Utilities.styled";


interface Props {
  $colorScheme: "light" | "dark";
}

export const StyledUnstyledButton = styled(UnstyledButton)<Props>`
  color: ${({ $colorScheme }) => {
    return lightDark(
      $colorScheme,
      "var(--mantine-color-black)",
      "var(--mantine-color-dark-0)"
    );
  }};
  padding: var(--mantine-spacing-xs) var(--mantine-spacing-sm);
  border-radius: var(--mantine-radius-sm);
  outline: none;
  border: none;
  background-color: transparent;
  transition: background-color 100ms ease;

  &:hover {
    cursor: pointer;
    background-color: ${({ $colorScheme }) => {
      return lightDark(
        $colorScheme,
        "var(--mantine-color-gray-1)",
        "var(--mantine-color-dark-8)"
      );
    }};
  }

  .name {
    display: none;

    ${media(bp.xs)} {
      display: block;
    }
  }

  .userActive {
    background-color: ${({ $colorScheme }) =>
      lightDark(
        $colorScheme,
        "var(--mantine-color-white)",
        "var(--mantine-color-dark-8)"
      )};
  }
`;
