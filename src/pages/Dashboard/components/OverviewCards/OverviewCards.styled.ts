import { rem } from "@mantine/core";
import styled from "styled-components";

import { alignItemsCenter, lightDark } from "@styles/Utilities.styled";


interface Props {
  $colorScheme: string;
}
export const StyledOverviewCards = styled.div<Props>`
  .root {
    padding: calc(var(--mantine-spacing-xl) * 1.5);
  }

  .value {
    font-size: ${rem(24)};
    font-weight: 700;
    line-height: 1;
  }

  .diff {
    ${alignItemsCenter}
    line-height: 1;
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
