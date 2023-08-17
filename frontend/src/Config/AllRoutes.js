import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import CreateNewNoteComponent from "../Components/CreateNewNoteComponent/CreateNewNoteCompoent";
import UpdateNoteComponent from "../Components/UpdateNoteComponent/UpdateNoteComponent";
import ViewNoteComponent from "../Components/ViewNoteComponent/ViewNoteComponent";
import GetAllNotesComponent from "../Components/GetAllNotesComponent/GetAllNotesComponent";
import { AboutComponent } from "../Components/AboutComponent/AboutComponent";
export const allRoutes = [
  {
    path: "/",
    element: <GetAllNotesComponent />,
  },
  {
    path: "/allnotes",
    element: <GetAllNotesComponent />,
  },
  {
    path: "/register",
    element: <RegisterComponent />,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/add-note",
    element: <CreateNewNoteComponent />,
  },
  {
    path: "/update-note/:id",
    element: <UpdateNoteComponent />,
  },
  {
    path: "/view-note/:id",
    element: <ViewNoteComponent />,
  },
  {
    path: "/about",
    element: <AboutComponent />,
  },
];
