import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  cognitoId: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: string;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: string;
  assignedUserId?: string;
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: string;
  projectManagerUserId?: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], { cognitoId: string }>({
      query: ({ cognitoId }) => `projects?cognitoId=${cognitoId}`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: "Projects", id })) : [{ type: "Projects" }],
    }),

    createProject: build.mutation<Project, Partial<Project> & { userId: string }>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: "Tasks", id })) : [{ type: "Tasks" }],
    }),

    getTasksByUser: build.query<Task[], { userId: string }>({
      query: ({ userId }) => `tasks/user/${userId}`,
      providesTags: (result, error, { userId }) =>
        result ? result.map(({ id }) => ({ type: "Tasks", id })) : [{ type: "Tasks", id: userId }],
    }),

    getTasksByCognitoId: build.query<Task[], { cognitoId: string }>({
      query: ({ cognitoId }) => `tasks/user/${cognitoId}`,
      providesTags: (result, error, { cognitoId }) =>
        result ? result.map(({ id }) => ({ type: "Tasks", id })) : [{ type: "Tasks", cognitoId }],
    }),

    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: "Tasks", id: taskId }],
    }),

    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),

    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),

    // New endpoint to get cognitoId by username
    getCognitoIdByUsername: build.query<{ cognitoId: string }, { username: string }>({
      query: ({ username }) => `users/username/${username}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserQuery,
  useGetTasksByCognitoIdQuery,
  useGetCognitoIdByUsernameQuery, // Export hook for new endpoint
} = api;
