'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Main = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === 'loading') return;
  if (!session) router.push('/login');
  else router.push('/dashboard');

  return null;
}

export default Main;