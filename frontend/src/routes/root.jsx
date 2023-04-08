import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

function Root() {
  return (
    <div>
      <Navbar />
      <div class="container is-max-desktop has-text-centered">
        <h1 class="title">LoL Nuzlocke</h1>
        <p class="subtitle">Play the League of Legends Nuzlocke Challenge!</p>
      </div>
      <div class="section">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
