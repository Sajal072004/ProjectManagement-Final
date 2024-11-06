import { Task } from '@/src/state/api';
import React from 'react';
import { format } from "date-fns";
import Image from 'next/image';

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className='mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-secondary dark:border-dark-border'>
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="text-lg text-gray-800 dark:text-gray-200">Attachments:</strong>
          <div className='flex flex-wrap mt-2'>
            {task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md shadow-sm"
              />
            )}
          </div>
        </div>
      )}

      <div className="mb-4">
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>ID:</strong> <span className="font-semibold">{task.id}</span>
        </p>
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Title:</strong> <span className="font-semibold">{task.title}</span>
        </p>
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Description:</strong> <span className="font-semibold">{task.description || "No description provided"}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Status:</strong> <span className="font-semibold">{task.status}</span>
        </p>
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Priority:</strong> <span className="font-semibold">{task.priority}</span>
        </p>
      </div>

      <div className="mb-4">
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Tags:</strong> <span className="font-semibold">{task.tags || "No Tags"}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Start Date:</strong> <span className="font-semibold">{task.startDate ? format(new Date(task.startDate), "P") : "Not Set"}</span>
        </p>
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Due Date:</strong> <span className="font-semibold">{task.dueDate ? format(new Date(task.dueDate), "P") : "Not Set"}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Author:</strong> <span className="font-semibold">{task.author ? task.author.username : "Unknown"}</span>
        </p>
        <p className='text-md text-gray-600 dark:text-gray-400'>
          <strong>Assignee:</strong> <span className="font-semibold">{task.assignee ? task.assignee.username : "Unassigned"}</span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
