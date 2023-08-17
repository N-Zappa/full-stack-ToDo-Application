import React from "react";
import "./footerStyle.css";

export const Footer = () => {
  return (
    <div className="footer">
      <span className="text-center">Contact me:</span>
      <p />
      <div className="footer-buttons">
        <a
          className="telegram-button"
          target="_blank"
          href="https://t.me/whawhawhawhawhawha"
        ></a>
        <a
          className="github-button"
          target="_blank"
          href="https://github.com/N-Zappa"
        ></a>
        <a
          className="mail-button"
          target="_blank"
          href="https://ilyaokulov5@gmail.com"
        ></a>
      </div>
    </div>
  );
};
