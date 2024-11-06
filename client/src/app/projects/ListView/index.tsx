import Header from '@/src/components/Header';
import { Task, useGetTasksQuery } from '@/src/state/api';
import React from 'react';
import TaskCard from '@/src/components/TaskCard';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { user } = useUser(); // Get user from Clerk
  const userId = user ? user.id : null; // Extract userId
  const { data: tasks, error, isLoading } = useGetTasksQuery({
    projectId: Number(id),
 // Pass userId in the query (if your API supports it)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className='flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600'
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ListView;
