import React from "react";
import "./aboutStyle.css";
import { Header } from "../../ViewComponents/Header/Header";
import { Footer } from "../../ViewComponents/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/use-auth";
import { Navigate } from "react-router-dom";

export const AboutComponent = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  return isAuthenticated.isAuth ? (
    <div className="App">
      <Header />
      <div className="about-container">
        <span className="text-style">
          Application is designed to simplify and enhance your note-taking
          experience, making it easier for you to organize your thoughts, ideas,
          and important information With our user-friendly interface, you can
          seamlessly create, edit, and manage your notes anytime, anywhere.
        </span>
        <p />
        <span className="text-style">
          Whether you are a student taking class notes, a professional in need
          of a digital notebook, or simply someone who loves jotting down
          thoughts, our application caters to all your needs.
        </span>
        <p />
        <button className="btn-notes" onClick={() => navigate("/allnotes")}>
          Notes
        </button>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
