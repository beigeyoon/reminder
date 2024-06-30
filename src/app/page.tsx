import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Main = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
}

export default Main;