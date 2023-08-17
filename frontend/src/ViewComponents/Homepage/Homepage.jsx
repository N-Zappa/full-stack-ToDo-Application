import { Header } from "../Header/Header";
import GetAllNotesComponent from "../../Components/GetAllNotesComponent/GetAllNotesComponent";
import "./homepageStyle.css";
import { Footer } from "../Footer/Footer";
export const Homepage = () => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};
