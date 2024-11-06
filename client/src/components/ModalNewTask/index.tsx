import Modal from "../Modal";
import { useCreateTaskMutation, Priority, Status, useGetCognitoIdByUsernameQuery } from "@/src/state/api"; // Import the query hook
import React, { useState } from "react";
import { formatISO } from "date-fns";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook
import { toast } from "react-toastify"; // Import toast from react-toastify

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const { user } = useUser(); // Get user information from Clerk
  const userId = user?.id; // Extract userId from Clerk
  const [createTask, { isLoading }] = useCreateTaskMutation();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState<string | undefined>(userId); // Author userId (from Clerk)
  const [assignedUsername, setAssignedUsername] = useState(""); // Username input
  const [assignedCognitoId, setAssignedCognitoId] = useState<string | null>(null); // Fetched cognitoId
  const [projectId, setProjectId] = useState("");

  // Fetch cognitoId by username
  const { data: assignedUserData } = useGetCognitoIdByUsernameQuery(
    { username: assignedUsername },
    { skip: !assignedUsername } // Skip until there's a username
  );

  // Update assignedCognitoId when assignedUserData changes
  React.useEffect(() => {
    if (assignedUserData) {
      setAssignedCognitoId(assignedUserData.cognitoId);
    }
  }, [assignedUserData]);

  const handleSubmit = async () => {
    if (!title || !userId || !(id !== null || projectId)) return; // Ensure userId and projectId are valid

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    try {
      await createTask({
        title,
        description,
        status,
        priority,
        tags,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: authorUserId!, // Use the extracted userId
        assignedUserId: assignedCognitoId || "", // Use fetched cognitoId
        projectId: id !== null ? Number(id) : Number(projectId),
      });

      // Show success toast
      toast.success("Task created successfully!");

      // Clear form entries after successful task creation
      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Backlog);
      setTags("");
      setStartDate("");
      setDueDate("");
      setAssignedUsername("");
      setAssignedCognitoId(null);
      setProjectId("");

      // Optionally close the modal
      onClose();
    } catch (error) {
      // Handle error (optional)
      toast.error("Failed to create task. Please try again.");
    }
  };

  const isFormValid = () => {
    return title && authorUserId && (id !== null || projectId); // Check if form is valid
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Task Title */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Task Description */}
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Status and Priority Select */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>

          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>

        {/* Tags */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Start and Due Dates */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Assigned Username */}
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned Username"
          value={assignedUsername}
          onChange={(e) => setAssignedUsername(e.target.value)}
        />

        {/* Project ID */}
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ProjectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
