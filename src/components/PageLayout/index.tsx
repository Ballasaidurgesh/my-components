import { sidebarItems } from "@/helpers/sidebarItems";
import "./styles.scss";
import { TbCodeDots } from "react-icons/tb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="page-layout">
      <nav>
        <div className="flex-align-center">
          <TbCodeDots size={30} color="#3f51b5" />
          <h4>My Components</h4>
        </div>
      </nav>

      <div className="page-layout__container">
        <div className="page-layout__sidebar page-layout__left-section">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`sidebar-item ${item?.isTitle ? "title" : ""} ${
                location.pathname === item.link ? "active" : ""
              }`}
              onClick={() => navigate(item.link)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div className="page-layout__middle-section">
          <Outlet />
        </div>

        <div className="page-layout__sidebar page-layout__right-section">
          <h4>Contents</h4>

          {sidebarItems[0]?.contents?.map((item, index) => (
            <div
              key={index}
              className="sidebar-item content-item"
              onClick={() => navigate(item.link)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
