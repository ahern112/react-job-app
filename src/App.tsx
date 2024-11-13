/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

// Router imports
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

export interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

const App = () => {
  // Add New Job
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addJob = async (newJob: any) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id: string) => {
    console.log("delete", id);
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Edit Job
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateJob = async (job: Job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/jobs", element: <JobsPage /> },
          { path: "/add-job", element: <AddJob addJobSubmit={addJob} /> },
          {
            path: "/jobs/:id",
            element: <JobPage deleteJob={deleteJob} />,
            loader: jobLoader,
          },
          {
            path: "/edit-jobs/:id",
            element: <EditJob updateJobSubmit={updateJob} />,
            loader: jobLoader,
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
      },
    }
  );

  return <RouterProvider router={router} future={{
    v7_startTransition: true,
  }} />;
};

export default App;
