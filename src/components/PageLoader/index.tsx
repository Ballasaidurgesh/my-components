import "./styles.scss";

type TProps = {
  isLoading: boolean;
  message?: string;
  style?: React.CSSProperties;
  className?: string;
};

function PageLoader({ isLoading = false, message, style, className = "" }: TProps) {
  return (
    isLoading && (
      <div className={`page-loader ${className}`} style={style}>
        <div className="spinner"></div>
        <h3>{message}</h3>
      </div>
    )
  );
}

export default PageLoader;
