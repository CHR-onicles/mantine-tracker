import styled from "styled-components";

import { alignItemsCenter, lightDark } from "@styles/Utilities.styled";


interface Props {
  $colorScheme: string;
}

export const StyledOverviewCards = styled.div<Props>`
  .diff {
    ${alignItemsCenter}
  }

  .icon {
    color: ${({ $colorScheme }) =>
      `${lightDark(
        $colorScheme,
        "var(--mantine-color-gray-4)",
        " var(--mantine-color-dark-3)"
      )}`};
  }
`;
