'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const { data: session } = useSession();
    const router = useRouter();
    
    useEffect(() => {
      if (!session) {
        router.push('/login');
      }
    }, [router, session]);

    if (!session) {
      return null;
    }

    return <Component {...props} />
  }
}

export default withAuth;