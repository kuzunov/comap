import { createBrowserRouter } from "react-router-dom";
import AddEvent from "./components/events/AddEvent";
import EventController from "./components/events/EventController";
import EventDetails from "./components/events/EventDetails";
import About from "./components/main/About";
import App from "./components/main/App";
import Dashboard from "./components/main/Dashboard/Dashboard";
import NotFound from "./components/NotFound";
import AddOrganization from "./components/oragnizations/AddOrganization";
import OragnizationDetails from "./components/oragnizations/OragnizationDetails";
import Organizations from "./components/oragnizations/Oganizations";
import LatestReviews from "./components/reviews/LatestReviews";
import EditUserForm from "./components/users/EditUserForm";
import Profile from "./components/users/Profile";
import { DashboardApi, EventsApi, OrganizationsApi } from "./service/rest-api-client";
import Login from "./components/users/Login";
import ShareButtons from "./components/main/ShareButtons";
import UsersList from "./components/users/UsersList";
import { UsersApi } from "./service/UsersApi";
import { RequireAuth } from "./components/users/RequireAuth";
import { CommentsApi } from "./service/CommentsApi";
import ErrorComponent from "./components/main/ErrorComponent";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        
        index:true,
        element: <Dashboard />,
        errorElement: <ErrorComponent/>,
        loader: async () => {
          try{
          const dashData = await DashboardApi.findAll();
          return dashData;
          } catch (err) {
            throw err;
          }
        }
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
        action: async ({request,params}) => {
          try {
         switch (request.method) {
          case "POST":
            { 
              const fd = await request.formData()
              const eventData = fd.get('event');
              const tokenData = fd.get('token') as string;
              const res = await EventsApi.create(JSON.parse(eventData as string),tokenData);
              return res;
          }
           
          case "DELETE": 
          {
            const fd = await request.formData()
            const id = fd.get('id') as string;
            const token = fd.get('token') as string
            const response = await EventsApi.deleteById(id,token);
            return;
          }
          case "PUT":
            { 
              const fd = await request.formData()
              const eventData = fd.get('event');
              const tokenData = fd.get('token') as string;
              let entity = JSON.parse(eventData as string)
              console.log(entity)
              const res = await EventsApi.update(entity,tokenData);
              //return res;
          } 
        }} catch (e) {console.log(e)}
      },
        children: [
          {
            path: ":eventId",
            errorElement: <ErrorComponent/>,
            loader: async ({ params }) => {
              if (params.eventId) {
                const eventId = params.eventId;
                const event = await EventsApi.findById(eventId)
                return { event: event , local: "",
                };
              }
          
            },
            element: <EventDetails />,
            children: [
              {
                path: "share",
                element:<ShareButtons />,
              },
              {
                path: "comments",
                //element: <CommentsList />,
                index:true,
                loader: async ({params}) => {
                  if (params.eventId) {
                    const comments = await CommentsApi.getByParentId("events",params.eventId);
                    return comments;
                  }
                  
                },
                action: async ({params,request}) => {
                  if(request.method === "POST") {
                    if (params.eventId){
                    const fd = await request.formData()
                    const commentData = fd.get("comment") as unknown as string;
                    const comment = JSON.parse(commentData)
                    const token = fd.get('token') as string;
                    const resp = await CommentsApi.createComment(comment,'events',params.eventId,token)
                   }
                  }
                }
              }
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
        loader: async () => {
          return await UsersApi.findAll();
        },
        children: [
       
        ],
      },{ 
        path:"/users/:userId",
        element: <Profile />,
        errorElement: <ErrorComponent/>,
        loader: async ({params}) => {
          if (params.userId) {
            return await UsersApi.findById(params.userId)
          }
        }
      }, {
        path:"/users/:userId/edit",
        element: <RequireAuth><EditUserForm /></RequireAuth>,
        loader:async ({params}) => {
          if (params.userId){
            return await UsersApi.findById(params.userId);
          }
        },
        
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
