import { rem } from "@mantine/core";
import styled from "styled-components";

import { bp, flexColumn } from "@styles/Utilities.styled";


export const StyledSignIn = styled.div`
  height: 100svh;
  outline: 1px solid red;
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80);

  .form {
    ${flexColumn}
    justify-content:center;
    min-height: 100svh;
    max-width: ${rem(470)};
    padding-top: ${rem(80)};

    @media (max-width: ${bp.sm}) {
      max-width: 100%;
    }
  }

  .title {
    color: var(--mantine-color-blue-6);
  }
`;
