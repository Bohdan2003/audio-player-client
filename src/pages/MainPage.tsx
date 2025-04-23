import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const MainPage: React.FC = () => {
  return (<section>
    <div className="container">
      <Typography className="my-5" variant="h4">Main Page</Typography>
      <Link className="text-accent" to="/tracks/1">Tracks</Link>
    </div>
  </section>);
};