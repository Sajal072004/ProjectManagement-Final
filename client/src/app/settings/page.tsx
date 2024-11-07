"use client";
import Header from "@/src/components/Header";
import React from "react";
import { useUser } from "@clerk/nextjs";

const Settings = () => {
  const { user } = useUser();

  const userSettings = {
    username: user?.username || "N/A",
    email: user?.emailAddresses?.[0]?.emailAddress || "N/A",
    firstName: user?.firstName || "N/A",
    lastName: user?.lastName || "N/A",
    createdAt: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A",
    profileImageUrl: user?.imageUrl || "/default-profile.png" // Use default if no profile image
  };

  const labelStyles = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const textStyles = "mt-1 block w-full p-2 bg-gray-100 rounded-md text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  const containerStyles = "p-8 max-w-lg mx-auto bg-white rounded-xl shadow-md dark:bg-gray-900";

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <Header name="Settings" />
      <div className={containerStyles}>
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={userSettings.profileImageUrl}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">User Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className={labelStyles}>Username</label>
            <div className={textStyles}>{userSettings.username}</div>
          </div>
          <div>
            <label className={labelStyles}>Email</label>
            <div className={textStyles}>{userSettings.email}</div>
          </div>
          <div>
            <label className={labelStyles}>First Name</label>
            <div className={textStyles}>{userSettings.firstName}</div>
          </div>
          <div>
            <label className={labelStyles}>Last Name</label>
            <div className={textStyles}>{userSettings.lastName}</div>
          </div>
          <div>
            <label className={labelStyles}>Account Created On</label>
            <div className={textStyles}>{userSettings.createdAt}</div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
        Please use the above profile icon to make changes
      </p>
    </div>
  );
};

export default Settings;
