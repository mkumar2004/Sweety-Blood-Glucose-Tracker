import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHero } from '@/components/auth/AuthHero';
import { AuthIllustration } from '@/components/auth/AuthIllustration';
import { GlucosePreview } from '@/components/auth/GlucosePreview';
import { LoginForm } from '@/components/auth/LoginForm';

export function Login() {
  return (
    <AuthLayout
      hero={
        <AuthHero
          heading={`Four readings a day.\nA clearer picture.`}
          description="Log your blood glucose after every key moment of the day and see daily and monthly reports at a glance."
        />
      }
      illustration={<AuthIllustration />}
      preview={<GlucosePreview variant="login" />}
      form={<LoginForm />}
    />
  );
}

