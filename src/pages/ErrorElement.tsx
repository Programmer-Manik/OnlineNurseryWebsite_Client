import { Link } from "react-router-dom";

const ErrorElement = () => {
  return (
    <div className="min-h-screen flex gap-6 justify-center items-center flex-col">
      <div>
        <h2 className="text-7xl font-bold">404</h2>
        <p>Page Not Found!</p>
      </div>
      <Link to="/">
        <button className="btn btn-neutral">Go to home</button>
      </Link>
    </div>
  );
};

export default ErrorElement;
