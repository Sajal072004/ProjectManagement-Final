import { Task } from '@/src/state/api';
import React from 'react';
import { format } from "date-fns";
import Image from 'next/image';
import { useGetUsernameByCognitoIdQuery } from '@/src/state/api';

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const { data: authorData } = useGetUsernameByCognitoIdQuery({ cognitoId: task.authorUserId || "" });
  const { data: assigneeData } = useGetUsernameByCognitoIdQuery({ cognitoId: task.assignedUserId || "" });

  return (
    <div className="relative mb-6 rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-secondary dark:border-blue-400">
      {/* Left colored line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-blue-500 dark:bg-blue-400" />

      {/* Attachments */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="text-lg text-blue-600 dark:text-blue-400">Attachments:</strong>
          <div className="flex flex-wrap mt-2">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-md shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Task Information */}
      <div className="space-y-4">
        {/* ID */}
        <div className="flex items-start">
          <p className="font-bold text-blue-600 dark:text-blue-400">ID:</p>
          <span className="ml-2 text-gray-800 dark:text-gray-200">{task.id}</span>
        </div>

        {/* Title */}
        <div className="flex items-start">
          <p className="font-bold text-blue-600 dark:text-blue-400 text-lg">Title:</p>
          <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title}</span>
        </div>

        {/* Description */}
        <div className="flex items-start">
          <p className="font-bold text-blue-600 dark:text-blue-400">Description:</p>
          <span className="ml-2 text-gray-800 dark:text-gray-200">{task.description || "No description provided"}</span>
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Status:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{task.status}</span>
          </div>
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Priority:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{task.priority}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-start">
          <p className="font-bold text-blue-600 dark:text-blue-400">Tags:</p>
          <span className="ml-2 text-gray-800 dark:text-gray-200">{task.tags || "No Tags"}</span>
        </div>

        {/* Start Date and Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Start Date:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{task.startDate ? format(new Date(task.startDate), "P") : "Not Set"}</span>
          </div>
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Due Date:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{task.dueDate ? format(new Date(task.dueDate), "P") : "Not Set"}</span>
          </div>
        </div>

        {/* Author and Assignee */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Author:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{authorData?.username || "Unknown"}</span>
          </div>
          <div className="flex items-start">
            <p className="font-bold text-blue-600 dark:text-blue-400">Assignee:</p>
            <span className="ml-2 text-gray-800 dark:text-gray-200">{assigneeData?.username || "Unassigned"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
