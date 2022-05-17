import { useEffect } from "react";
import scrollreveal from "scrollreveal";

import ScrollToTop from "../../components/ScrollToTop";
import Clients from "../../components/Clients";
import Footer from "../../components/Footer";
import Free from "../../components/Free";
import Home from "../../components/Home";
import Like from "../../components/Like";
import SignUp from "../../components/SignUp";
import SuperRare from "../../components/SuperRare";
import Release from "../../components/Release";

const HomePage = () => {
  useEffect(() => {
    const registerAnimations = () => {
      const sr = scrollreveal({
        origin: "bottom",
        distance: "80px",
        duration: 2000,
        reset: false,
      });
      sr.reveal(
        `
      nav, .home, .free, .clients, .super-rare, .releases, .like, .signup, footer
      `,
        { interval: 500 }
      );
    };
    registerAnimations();
  }, []);

  window.setTimeout(() => {
    const home = document.getElementsByClassName("home");
    home[0].style.transform = "none";
    const nav = document.getElementsByTagName("nav");
    nav[0].style.transform = "none";
  }, 1500);

  return (
    <>
      <ScrollToTop />
      <Home />
      <Free />
      <Clients />
      <SuperRare />
      <Release />
      <Like />
      <SignUp />
      <Footer />
    </>
  );
};

export default HomePage;
