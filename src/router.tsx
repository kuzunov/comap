import { createBrowserRouter } from "react-router-dom";
import AddEvent from "./components/events/AddEvent";
import EventController from "./components/events/EventController";
import EventDetails from "./components/events/EventDetails";
import About from "./components/main/About";
import App from "./components/main/App";
import Dashboard from "./components/main/Dashboard";
import NotFound from "./components/NotFound";
import AddOrganization from "./components/oragnizations/AddOrganization";
import OragnizationDetails from "./components/oragnizations/OragnizationDetails";
import Organizations from "./components/oragnizations/Oganizations";
import LatestReviews from "./components/reviews/LatestReviews";
import Review from "./components/reviews/Review";
import ReviewList from "./components/reviews/ReviewList";
import EditUserForm from "./components/users/EditUserForm";
import Profile from "./components/users/Profile";
import { EventsApi, OrganizationsApi } from "./service/rest-api-client";
import Login from "./components/users/Login";
import ShareButtons from "./components/main/ShareButtons";
import ErrorComponent from "./components/ErrorComponent";
import UsersList from "./components/users/UsersList";
import { UsersApi } from "./service/UsersApi";
import { RequireAuth } from "./components/users/RequireAuth";
import { CommentsApi } from "./service/CommentsApi";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/register",
       element: <EditUserForm />,
        errorElement: <ErrorComponent/>,
      },
      {
        path: "/events",
        element: <EventController />,
        errorElement: <ErrorComponent/>,
        loader: () => {
          return EventsApi.findAll();
        },
        children: [
          {
            path: ":eventId",
            errorElement: <ErrorComponent/>,
            loader: async ({ params }) => {
              if (params.eventId) {
                const eventId = params.eventId;
                const comments = await CommentsApi.getByParentId("events",eventId);
                const event = await EventsApi.findById(eventId)
                return { event: event , local: "",
                        comments: comments
                };
              }
          
            },
            element: <EventDetails />,
            children: [
              {
                path: "delete",
                action: async ({ params }) => {
                  if (params.eventId) {
                    const eventId = params.eventId;
                    return await EventsApi.deleteById(eventId);
                  }
                },
                             
                
              },
              {
                path: "share",
                element:<ShareButtons />,
              },
            ],
          },
          {
            path: "add",
            element:<RequireAuth><AddEvent /></RequireAuth>,
            errorElement: <ErrorComponent/>,
          },
          {
            path: ":eventId/edit",
            errorElement:<ErrorComponent/>,
            loader: ({ params }) => {
              if (params.eventId) {
                const eventId = params.eventId;
                return EventsApi.findById(eventId);
              }
            },
            element: <RequireAuth><AddEvent /></RequireAuth>,
          },
        ],
      },
      {
        path: "/organizations",
        errorElement: <ErrorComponent/>,
        element: <Organizations />,
        loader: () => {
          return OrganizationsApi.findAll();
        },
        children: [
          {
            path: ":organizationId",
            errorElement: <ErrorComponent/>,
            loader:  async ({ params }) => {
              if (params.organizationId) {
              return { event: await EventsApi.findById(params.organizationId), local: "", comments: [{id:1,body:1},{id:1,body:1},{id:1,body:1}]};
            }},
            element: <OragnizationDetails />,
          },
          {
            path: "add",
            errorElement: <RequireAuth><ErrorComponent/></RequireAuth>,
            loader: () => {
              // return mockEevents[1];
            },
            element: <AddOrganization />,
          },
        ],
      },
      {
        path: "/users",
        element: <UsersList />,
        errorElement: <ErrorComponent/>,
        loader: () => {},
        children: [
         { 
          path:":userId/profile",
          element: <Profile />,
          errorElement: <ErrorComponent/>,
          loader: async ({params}) => {
            if (params.userId) {
              return await UsersApi.findById(params.userId)
            }
          }
        },
        {
          path:":userId/profile/edit",
          element: <RequireAuth><EditUserForm /></RequireAuth>,
          loader:async ({params}) => {
            if (params.userId){
              return await UsersApi.findById(params.userId);
            }
          },
          
        }
        ],
      },
      {
        path: "/reviews",
        errorElement: <ErrorComponent/>,
        element: <LatestReviews />,
        children: [
          // {
          //   path: ":reviewId",
          //   element: <Review {}/>,
          // },
          {
            path: "latest",
            element: <LatestReviews />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
