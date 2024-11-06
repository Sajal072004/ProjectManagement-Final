import { Project } from "@/src/state/api";
import React from "react";
import { format } from "date-fns";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-secondary dark:border-dark-border">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{project.name}</h3>
      <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
        {project.description || "No description provided"}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <p className="text-md text-gray-600 dark:text-gray-400">
          <strong>Start Date:</strong> <span className="font-semibold">{project.startDate ? format(new Date(project.startDate), "P") : "Not Set"}</span>
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          <strong>End Date:</strong> <span className="font-semibold">{project.endDate ? format(new Date(project.endDate), "P") : "Not Set"}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
