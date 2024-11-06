import { User } from "@/src/state/api";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-start rounded-lg border border-gray-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-dark-secondary dark:border-dark-border">
      
      {/* User Info */}
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {user.username}
      </h3>
      <p className="text-md text-gray-600 dark:text-gray-400">
        {user.email}
      </p>
    </div>
  );
};

export default UserCard;
