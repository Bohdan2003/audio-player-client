import { Link } from "react-router-dom";

export const MainPage: React.FC = () => {
  return (<section>
    <div className="container">
      <p className="py-[20px] text-[24px]">Main Page</p>
      <Link className="text-accent" to="/tracks/1">Tracks</Link>
    </div>
  </section>);
};