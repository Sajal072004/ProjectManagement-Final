import { Project } from "@/src/state/api";
import React from "react";
import { format } from "date-fns";
import { useGetUsernameByCognitoIdQuery } from "@/src/state/api";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  // Fetch the project owner's username using the cognitoId
  const { data: ownerData } = useGetUsernameByCognitoIdQuery({ cognitoId: project.cognitoId || "" });

  return (
    <div className="relative mb-6 rounded-lg border-l-4 border-green-500 bg-white p-6 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-secondary dark:border-green-400">
      {/* Left colored line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-green-500 dark:bg-green-400" />

      {/* Project Information */}
      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
        {project.name}
      </h3>
      <p className="text-md text-gray-800 dark:text-gray-200">
        {project.description || "No description provided"}
      </p>
      
      <div className="space-y-4 mt-4">
        {/* Project Dates */}
        <div className="grid grid-cols-2 gap-4">
          <p className="text-md text-gray-800 dark:text-gray-200">
            <strong className="text-green-600 dark:text-green-400">Start Date:</strong> 
            <span className="ml-2">{project.startDate ? format(new Date(project.startDate), "P") : "Not Set"}</span>
          </p>
          <p className="text-md text-gray-800 dark:text-gray-200">
            <strong className="text-green-600 dark:text-green-400">End Date:</strong> 
            <span className="ml-2">{project.endDate ? format(new Date(project.endDate), "P") : "Not Set"}</span>
          </p>
        </div>

        {/* Project Owner */}
        <div className="flex items-start">
          <p className="font-bold text-green-600 dark:text-green-400">Owner:</p>
          <span className="ml-2 text-gray-800 dark:text-gray-200">
            {ownerData?.username || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
