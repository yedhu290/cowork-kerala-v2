import NextAuth from 'next-auth';
import { authConfig } from '@/lib/admin/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Only guard the admin dashboard - the public marketing site is untouched.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/admin/:path*'],
};
