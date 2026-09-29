import { Stack, InputField, Checkbox, Button } from '@ds/react';

export default function SignUp() {
  return (
    <Stack as="form" gap="md">
      <InputField label="Email" type="email" error="Enter a valid email." />
      <Checkbox label="I accept the terms" required />
      <Button variant="primary">Create account</Button>
    </Stack>
  );
}
