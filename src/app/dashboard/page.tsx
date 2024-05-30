import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ItemsList from '@/src/containers/ItemsList';
import ItemsCalendar from "@/src/containers/ItemsCalendar";
import { useViewType } from '@/src/store/useViewType';
import { useListInfo } from "@/src/store/useListInfo";
import prisma from "@/prisma/db";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const items = await prisma.item.findMany({
    where: {
      listId: useListInfo.getState().listInfo?.id as string,
    },
    include: {
      tags: true,
      subItems: true,
    }
  });

  return (
    <div className='grow'>
      {useViewType.getState().viewType === 'list' ? (
        <ItemsList itemsData={items || []} />
      ) : (
        <ItemsCalendar />
      )}
    </div>
  )
}

export default Dashboard;