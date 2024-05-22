import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ItemsList from '@/src/containers/ItemsList';
import ItemsClass from '@/src/containers/ItemsClass';
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
    <div className='grow p-6'>
      {useViewType.getState().viewType === 'list' ? (
        <ItemsList itemsData={items || []} />
      ) : (
        <ItemsClass />
      )}
    </div>
  )
}

export default Dashboard;