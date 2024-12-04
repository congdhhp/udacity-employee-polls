import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import PollDetail from '../pages/PollDetail';
import LeaderBoard from '../pages/LeaderBoard';
import NewPoll from '../pages/NewPoll';
import NotFound from '../pages/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />
        },
        {
          path: "/add",
          element: <NewPoll />
        },
        {
          path: "/questions/:question_id",
          element: <PollDetail />
        },
        {
          path: "/leaderboard",
          element: <LeaderBoard />
        }
      ]
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
