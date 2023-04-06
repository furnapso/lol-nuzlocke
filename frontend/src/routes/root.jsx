import "bulma/css/bulma.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

function Root() {
  return (
      <div>
        <Navbar />
        <section class="section">
        <div class="section">
          <h1 class="title">LoL Nuzlocke</h1>
          <p class="subtitle">Play the League of Legends Nuzlocke Challenge!</p>
        </div>
        <div class="container">
          <Outlet />
        </div>
      </section>
      </div>
  );
}

export default Root;
