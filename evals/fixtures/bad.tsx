import { Button, Checkbox } from '@ds/react';

export default function SignUp() {
  return (
    <form style={{ padding: 16, color: '#333' }}>
      <input type="email" placeholder="Email" />
      <Checkbox />
      <Button variant="destructive" rounded>
        Create account
      </Button>
    </form>
  );
}
