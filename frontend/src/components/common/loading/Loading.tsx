import "./Loading.css";
import loading from "../../../assets/images/loading2.gif";
import { LoadingSize } from "../../../models/loading/loadingSize";

interface LoadingProps {
  size: LoadingSize;
}

export default function Loading({ size }: LoadingProps): JSX.Element {
  return (
    <div className="Loading">
      <img src={loading} className={size} alt="Loading..." />
    </div>
  );
}
