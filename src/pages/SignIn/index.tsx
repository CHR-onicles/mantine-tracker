import { useState } from "react";
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
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import { StyledSignIn } from "./SignIn.styled";


export const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1)
      .email({ message: "Invalid email" }),
    password: z.string().min(3, "Password has to be more than 3 characters"),
  });

  const form = useForm({
    initialValues: {
      email: "johndoe@test.com",
      password: "123456",
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <StyledSignIn className={"wrapper"}>
      <Paper className={"form"} radius={0} p={35}>
        <Title order={2} className={"title"} ta="center" mt="md" mb={50}>
          Welcome back to RandoTracker!
        </Title>

        <form onSubmit={form.onSubmit(vals => handleSubmit(vals))}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            description="Make sure no one is looking at your keyboard"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="sm" />
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
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
        </form>
      </Paper>
    </StyledSignIn>
  );
};
