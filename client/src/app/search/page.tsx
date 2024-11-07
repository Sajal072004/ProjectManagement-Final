"use client";

import Header from "@/src/components/Header";
import ProjectCard from "@/src/components/ProjectCard";
import TaskCard from "@/src/components/TaskCard";
import UserCard from "@/src/components/UserCard";
import { useSearchQuery } from "@/src/state/api";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Users, Projects or Tasks"
          className="w-full sm:w-1/2 rounded-md border p-3 shadow-md dark:bg-gray-800 dark:text-white dark:border-gray-700"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p className="dark:text-white">Loading...</p>}
        {isError && (
          <p className="dark:text-white">
            Error occurred while fetching search results.
          </p>
        )}
        {!isLoading && !isError && searchResults && (
          <div>
            {/* Tasks Section */}
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Tasks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {searchResults.projects && searchResults.projects?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Users Section */}
            {searchResults.users && searchResults.users?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Users
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results Found Message */}
            {(searchResults.tasks?.length === 0 &&
              searchResults.projects?.length === 0 &&
              searchResults.users?.length === 0) && (
              <p className="dark:text-white text-lg">
                No results found for your search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
