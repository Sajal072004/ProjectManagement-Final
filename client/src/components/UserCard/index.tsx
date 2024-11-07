import { User, useGetUserByCognitoIdQuery } from "@/src/state/api"; // Assuming this hook is available
import React, { useEffect, useState } from "react";

type Props = {
  user: User
};

const UserCard = ({ user }: Props) => {
  const [fullUser, setFullUser] = useState<any>(user); // Default to prop user

  // Fetch additional user information based on cognitoId
  if(user.cognitoId === undefined) return;
  const { data, error, isLoading } = useGetUserByCognitoIdQuery({
    cognitoId: user.cognitoId,
  });
  

  useEffect(() => {
    if (data) {
      setFullUser(data); // Update state with the complete user data
    }
  }, [data]);

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data</p>;

  if (!fullUser) return <p>User not found</p>;
  console.log("user--", data);

  return (
    <div className="relative mb-6 rounded-lg border-l-4 border-teal-500 bg-white p-6 shadow-lg transition-transform transform hover:scale-105 dark:bg-dark-secondary dark:border-teal-400">
      {/* Left colored line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-teal-500 dark:bg-teal-400" />

      {/* User Information */}
      <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">
        {fullUser.username || "Username not available"}
      </h3>
      {/* Profile Picture */}
      <div className="flex items-center mb-4">
        {fullUser.profilePictureUrl ? (
          <img
            src={fullUser.profilePictureUrl}
            alt={`${fullUser.username}'s profile`}
            className="h-12 w-12 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
            <span className="text-lg text-white">
              {fullUser.username?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Team (If Available) */}
      {fullUser.teamId && (
        <div className="flex items-start mb-4">
          <p className="font-bold text-teal-600 dark:text-teal-400">Team:</p>
          <span className="ml-2 text-gray-800 dark:text-gray-200">
            Team ID: {fullUser.teamId}
          </span>
        </div>
      )}

      {/* User's ID */}
      <div className="flex items-start">
        <p className="font-bold text-teal-600 dark:text-teal-400">User ID:</p>
        <span className="ml-2 text-gray-800 dark:text-gray-200">
          {fullUser.userId || "User ID not available"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
