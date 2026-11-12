import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHero } from '@/components/auth/AuthHero';
import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { GlucosePreview } from '@/components/auth/GlucosePreview';
import { SignupForm } from '@/components/auth/SignupForm';

export function Signup() {
  return (
    <AuthLayout
      hero={
        <AuthHero
          heading={`Your numbers,\nkept private.`}
          description="Every account only ever sees its own readings. Passwords are stored hashed."
        />
      }
      illustration={<AuthIllustration />}
      preview={<GlucosePreview variant="signup" />}
      form={<SignupForm />}
    />
  );
}

