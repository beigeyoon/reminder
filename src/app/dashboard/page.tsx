import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ItemsList from '@/src/containers/ItemsList';
import ItemsClass from '@/src/containers/ItemsClass';
import { useViewType } from '@/src/store/useViewType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='grow p-6'>
      <div className='flex justify-end gap-4 pb-6 text-lg text-gray400'>
        <button>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {useViewType.getState().viewType === 'list' ? (
        <ItemsList />
      ) : (
        <ItemsClass />
      )}
    </div>
  )
}

export default Dashboard;