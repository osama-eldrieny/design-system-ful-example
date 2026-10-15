/**
 * Orbit's pages without the app frame: authentication (sign in, sign up, reset password,
 * two-step verification) and system pages (404, 500, 503, coming soon, maintenance, success).
 */
import { useState, type ReactNode } from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FeaturedIcon,
  InputField,
  Link,
  Logo,
  Progress,
  VerificationCodeInput,
  useToast,
} from '@ds/react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Mail,
  Orbit,
  Rocket,
  ServerCrash,
  ShieldCheck,
  Unplug,
  Wrench,
  SearchX,
} from 'lucide-react';
import { go } from '../../router';
import { to } from '../Shell';

/* ------------------------------------------------------------------- auth */

function AuthFrame({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="orbit-auth">
      <main className="orbit-auth__form">
        <Logo icon={<Orbit />} name="Orbit" href={to('')} />
        <div className="orbit-auth__card">
          <div className="stack-text">
            <h1 className="orbit-auth__title">{title}</h1>
            <p className="muted orbit-auth__text">{description}</p>
          </div>
          {children}
          {footer && <p className="muted text-sm orbit-auth__text">{footer}</p>}
        </div>
      </main>
      <aside className="orbit-auth__art" aria-hidden="true">
        <div className="orbit-auth__quote">
          <strong>“Orbit replaced four tools and gave us one number everyone trusts.”</strong>
          <span>Jenny Wilson · Head of Revenue, Northwind</span>
        </div>
      </aside>
    </div>
  );
}

const Social = () => (
  <>
    <div className="orbit-form__two">
      <Button variant="secondary" appearance="outline" fullWidth>
        Continue with Google
      </Button>
      <Button variant="secondary" appearance="outline" fullWidth>
        Continue with GitHub
      </Button>
    </div>
    <Divider label="or" />
  </>
);

function SignIn() {
  const [email, setEmail] = useState('maya@orbit.app');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  return (
    <AuthFrame
      title="Welcome back"
      description="Sign in to your Orbit workspace."
      footer={
        <>
          New to Orbit? <Link href={to('/auth/sign-up')}>Create an account</Link>
        </>
      }
    >
      <Social />
      <form
        className="orbit-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (pw.length < 8) return setError('Enter your password (at least 8 characters).');
          go('/saas/auth/verify');
        }}
      >
        <InputField
          label="Email"
          type="email"
          iconStart={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <InputField
          label="Password"
          type="password"
          iconStart={<Lock />}
          value={pw}
          onChange={(e) => (setPw(e.target.value), setError(''))}
          error={error || undefined}
          required
          autoComplete="current-password"
        />
        <div className="row row--between">
          <Checkbox label="Keep me signed in" defaultChecked />
          <Link href={to('/auth/reset')}>Forgot password?</Link>
        </div>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </AuthFrame>
  );
}

function SignUp() {
  const [pw, setPw] = useState('');
  const strength = Math.min(
    4,
    [pw.length >= 8, /[A-Z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)].filter(Boolean)
      .length,
  );
  return (
    <AuthFrame
      title="Create your account"
      description="Free for 14 days. No card needed."
      footer={
        <>
          Already have an account? <Link href={to('/auth/sign-in')}>Sign in</Link>
        </>
      }
    >
      <Social />
      <form
        className="orbit-form"
        onSubmit={(e) => {
          e.preventDefault();
          go('/saas/auth/verify');
        }}
      >
        <div className="orbit-form__two">
          <InputField label="First name" required autoComplete="given-name" />
          <InputField label="Last name" required autoComplete="family-name" />
        </div>
        <InputField
          label="Work email"
          type="email"
          iconStart={<Mail />}
          required
          autoComplete="email"
        />
        <InputField
          label="Password"
          type="password"
          iconStart={<Lock />}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          autoComplete="new-password"
        />
        <Progress
          label="Password strength"
          value={strength}
          max={4}
          size="small"
          showValue
          formatValue={(v) => ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][v]}
          tone={strength < 2 ? 'danger' : strength < 4 ? 'warning' : 'success'}
        />
        <Checkbox label={<>I agree to the terms and privacy policy</>} required />
        <Button type="submit" fullWidth>
          Create account
        </Button>
      </form>
    </AuthFrame>
  );
}

function Reset() {
  const [sent, setSent] = useState(false);
  return (
    <AuthFrame
      title={sent ? 'Check your email' : 'Reset your password'}
      description={
        sent
          ? 'We sent a reset link to your inbox. It expires in 30 minutes.'
          : 'Enter the email you sign in with and we’ll send a reset link.'
      }
      footer={
        <Link href={to('/auth/sign-in')}>
          <ArrowLeft aria-hidden="true" className="orbit-inline-icon" /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <FeaturedIcon icon={<Mail />} size="large" tone="success" />
      ) : (
        <form
          className="orbit-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <InputField
            label="Email"
            type="email"
            iconStart={<Mail />}
            required
            autoComplete="email"
          />
          <Button type="submit" fullWidth>
            Send reset link
          </Button>
        </form>
      )}
    </AuthFrame>
  );
}

function Verify() {
  const toast = useToast();
  const [code, setCode] = useState('');
  return (
    <AuthFrame
      title="Two-step verification"
      description="Enter the 6-digit code we texted to •••• 4821."
      footer={
        <>
          Didn’t get it?{' '}
          <Button appearance="text" size="small" onClick={() => toast({ title: 'New code sent' })}>
            Resend code
          </Button>
        </>
      }
    >
      <FeaturedIcon icon={<ShieldCheck />} size="large" />
      <form
        className="orbit-form"
        onSubmit={(e) => {
          e.preventDefault();
          go('/saas');
        }}
      >
        <div className="scroll-x">
          <VerificationCodeInput
            label="Verification code"
            value={code}
            onValueChange={setCode}
            separatorAfter={3}
            size="small"
            onComplete={() => go('/saas')}
          />
        </div>
        <Button type="submit" fullWidth disabled={code.length < 6}>
          Verify and continue
        </Button>
      </form>
    </AuthFrame>
  );
}

/* ----------------------------------------------------------------- system */

function SystemPage({
  icon,
  tone = 'primary',
  code,
  title,
  text,
  children,
}: {
  icon: ReactNode;
  tone?: 'primary' | 'danger' | 'warning' | 'success';
  code?: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <main className="orbit-system">
      <Logo icon={<Orbit />} name="Orbit" href={to('')} />
      <div className="orbit-system__body">
        <FeaturedIcon icon={icon} size="xlarge" tone={tone} />
        {code && <p className="orbit-system__code">{code}</p>}
        <h1 className="orbit-auth__title">{title}</h1>
        <p className="muted orbit-auth__text">{text}</p>
        {children ?? (
          <span className="row orbit-system__actions">
            <Button
              variant="secondary"
              appearance="outline"
              iconStart={<ArrowLeft />}
              onClick={() => history.back()}
            >
              Go back
            </Button>
            <Button href={to('')}>Back to overview</Button>
          </span>
        )}
      </div>
      <p className="muted text-sm">© 2026 Orbit Labs</p>
    </main>
  );
}

function Countdown() {
  return (
    <ul className="orbit-countdown" aria-label="Launch in 12 days, 8 hours, 45 minutes">
      {[
        ['12', 'days'],
        ['08', 'hours'],
        ['45', 'minutes'],
        ['20', 'seconds'],
      ].map(([n, l]) => (
        <li key={l}>
          <strong>{n}</strong>
          <span className="muted text-sm">{l}</span>
        </li>
      ))}
    </ul>
  );
}

function Subscribe() {
  const toast = useToast();
  return (
    <form
      className="orbit-subscribe"
      onSubmit={(e) => {
        e.preventDefault();
        toast({ title: 'You’re on the list', tone: 'success' });
      }}
    >
      <InputField
        label="Email"
        hideLabel
        type="email"
        placeholder="you@company.com"
        iconStart={<Mail />}
        required
      />
      <Button type="submit">Notify me</Button>
    </form>
  );
}

const pages: Record<string, () => ReactNode> = {
  '/auth/sign-in': SignIn,
  '/auth/sign-up': SignUp,
  '/auth/reset': Reset,
  '/auth/verify': Verify,
  '/pages/404': () => (
    <SystemPage
      icon={<SearchX />}
      code="404"
      title="Page not found"
      text="The page you’re looking for doesn’t exist or has moved."
    />
  ),
  '/pages/500': () => (
    <SystemPage
      icon={<ServerCrash />}
      tone="danger"
      code="500"
      title="Something went wrong"
      text="We hit an error on our side. Our team has been notified; please try again in a moment."
    />
  ),
  '/pages/503': () => (
    <SystemPage
      icon={<Unplug />}
      tone="warning"
      code="503"
      title="Service unavailable"
      text="Orbit is temporarily overloaded. Check the status page for updates."
    />
  ),
  '/pages/coming-soon': () => (
    <SystemPage
      icon={<Rocket />}
      title="Something new is coming"
      text="Orbit Forecasts launches soon. Be the first to try it."
    >
      <Countdown />
      <Subscribe />
    </SystemPage>
  ),
  '/pages/maintenance': () => (
    <SystemPage
      icon={<Wrench />}
      tone="warning"
      title="Down for maintenance"
      text="We’re upgrading our database. We expect to be back by 14:00 UTC."
    >
      <span className="row muted text-sm">
        <Clock aria-hidden="true" className="orbit-inline-icon" /> About 40 minutes left
      </span>
      <Progress label="Maintenance progress" hideLabel value={62} />
    </SystemPage>
  ),
  '/pages/success': () => (
    <SystemPage
      icon={<CheckCircle2 />}
      tone="success"
      title="You’re all set"
      text="Your workspace is ready. We sent a receipt to maya@orbit.app."
    >
      <Button href={to('')}>Go to dashboard</Button>
    </SystemPage>
  ),
};

export default function System({ path }: { path: string }) {
  const P = pages[path] ?? pages['/pages/404'];
  return <P />;
}
