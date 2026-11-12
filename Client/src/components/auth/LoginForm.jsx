import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthFormCard } from './AuthFormCard';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@/services/authservices';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      setLoading(true);
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (data.token) {
        login(data);
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  return (
    <AuthFormCard>
      {/* Header */}
      <div className="space-y-1.5 mb-6 text-left">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-sm text-neutral-500 dark:text-[#A3A3A3]">
          Log in to see your readings and reports.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-600 dark:text-red-400">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="login-email"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={loading}
            className={`w-full h-11 px-3.5 rounded-xl text-sm transition-colors outline-none
              bg-white dark:bg-[#121212] text-neutral-900 dark:text-[#F5F5F5]
              border ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                  : 'border-neutral-200 dark:border-[#262626] focus:border-neutral-400 dark:focus:border-neutral-600'
              }
              placeholder:text-neutral-400 dark:placeholder:text-neutral-600
              disabled:opacity-60
            `}
          />
          {errors.email && (
            <p className="text-xs text-red-500 dark:text-red-400 pl-0.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5 text-left">
          <label
            htmlFor="login-password"
            className="block text-xs font-medium text-neutral-700 dark:text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              className={`w-full h-11 px-3.5 pr-10 rounded-xl text-sm transition-colors outline-none
                bg-white dark:bg-[#121212] text-neutral-900 dark:text-[#F5F5F5]
                border ${
                  errors.password
                    ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                    : 'border-neutral-200 dark:border-[#262626] focus:border-neutral-400 dark:focus:border-neutral-600'
                }
                placeholder:text-neutral-400 dark:placeholder:text-neutral-600
                disabled:opacity-60
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 dark:text-red-400 pl-0.5">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer shadow-sm
            bg-[#171717] hover:bg-[#262626] text-white
            dark:bg-[#FFFFFF] dark:hover:bg-[#E5E5E5] dark:text-[#090909]
            active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{loading ? 'Logging in...' : 'Log in'}</span>
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center space-y-2 select-none">
        <p className="text-sm text-neutral-500 dark:text-[#A3A3A3]">
          New to Sweety?{' '}
          <Link
            to="/signup"
            className="font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthFormCard>
  );
}
