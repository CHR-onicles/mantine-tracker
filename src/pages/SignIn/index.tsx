import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { StyledSignIn } from "./SignIn.styled";


export const SignIn = () => {
  const navigate = useNavigate();

  return (
    <StyledSignIn className={"wrapper"}>
      <Paper className={"form"} radius={0} p={35}>
        <Title order={2} className={"title"} ta="center" mt="md" mb={50}>
          Welcome back to RandoTracker!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          description="Make sure no one is spying on your keyboard"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" onClick={() => navigate("/home")}>
          Login
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={event => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </StyledSignIn>
  );
};
