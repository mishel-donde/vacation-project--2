import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="NotFound">
      <h1>Oops! Page not found</h1>
      <p>The page you’re looking for doesn’t exist or has been moved.</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
