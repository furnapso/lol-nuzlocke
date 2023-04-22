import { Link, MenuItem, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <MenuItem>
          {" "}
          <Typography variant="h6" component="div">
            Lol NuzLocke
          </Typography>
        </MenuItem>
        <MenuItem>
          <Link href="/" color="inherit" underline="none" variant="button">
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/rules" color="inherit" underline="none" variant="button">
            Rules
          </Link>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}
