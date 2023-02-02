import { NavLink } from "react-router-dom";
import links from "../utilities/links";

function Navlinks({ toggleSidebar }) {
  const renderedLinks = links.map((link) => {
    const { text, path, id, icon } = link;
    return (
      <NavLink
        to={path}
        key={id}
        onClick={toggleSidebar}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <span className="icon">{icon}</span>
        {text}
      </NavLink>
    );
  });

  return <div className="nav-links">{renderedLinks}</div>;
}

export default Navlinks;
