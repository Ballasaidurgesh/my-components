import "./styles.scss";

function PageLoader({ message = "" }) {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <h3>{message}</h3>
    </div>
  );
}

export default PageLoader;
