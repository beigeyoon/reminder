import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ItemsList from '@/src/containers/ItemsList';
import ItemsClass from '@/src/containers/ItemsClass';
import { useViewType } from '@/src/store/useViewType';
import { useListInfo } from "@/src/store/useListInfo";
import prisma from "@/prisma/db";
import { motion } from "framer-motion";

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
    <motion.div
      className='grow'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {useViewType.getState().viewType === 'list' ? (
        <ItemsList itemsData={items || []} />
      ) : (
        <ItemsClass />
      )}
    </motion.div>
  )
}

export default Dashboard;