import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router";
import Navbar from "../components/navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Root() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </CssBaseline>
    </ThemeProvider>
  );
}
