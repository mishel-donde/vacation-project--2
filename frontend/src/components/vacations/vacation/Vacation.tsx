import { useNavigate } from "react-router-dom";
import VacationModel from "../../../models/vacation/Vacation";
import "./Vacation.css";
import { useContext, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import useService from "../../../hooks/useService";
import VacationsService from "../../../services/auth-aware/Vacations";
import {
  remove,
  followVacation,
  unfollowVacation,
} from "../../../redux/vacationsSlice";
import FollowService from "../../../services/auth-aware/Follows";
import { AuthContext } from "../../auth/auth/Auth";
import { showToast } from "../../common/toast/Toast";
import axios from "axios";

interface VacationProps {
  vacation: VacationModel;
  isAdmin?: boolean;
}

export default function Vacation({ vacation, isAdmin }: VacationProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vacationsService = useService(VacationsService);
  const followService = useService(FollowService);

  const { user } = useContext(AuthContext)!;

  const {
    vacationId,
    destination,
    vacationDestination,
    startingDate,
    endingDate,
    price,
    imageUrl,
    followers = [],
  } = vacation;

  const isFollowing = user
    ? followers.some((follower) => follower.userId === user.userId)
    : false;

  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function editMe() {
    navigate(`/admin/edit-vacation/${vacationId}`);
  }

  function deleteMe() {
    setShowDeleteConfirm(true);
  }

  async function confirmDelete() {
    try {
      await vacationsService.remove(vacationId);
      dispatch(remove({ vacationId }));
      showToast.success(`Vacation to ${destination} deleted`);
      setShowDeleteConfirm(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast.error(err.response?.data || "An error occurred");
      } else {
        showToast.error("An unexpected error occurred");
      }
    }
  }

  async function handleFollowToggle() {
    if (!user) return; // אם המשתמש לא מחובר, אל תעשה כלום

    try {
      setIsFollowLoading(true);

      if (isFollowing) {
        await followService.unfollowVacation(vacationId); // הסר את העוקב
        dispatch(unfollowVacation({ vacationId, user })); // עדכן את ה־state ב־Redux
        showToast.success(
          `Successfully unfollowed ${vacation.destination} vacation`
        );
      } else {
        await followService.followVacation(vacationId); // הוסף את העוקב
        dispatch(followVacation({ vacationId, user })); // עדכן את ה־state ב־Redux
        showToast.success(
          `Successfully followed ${vacation.destination} vacation`
        );
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast.error(err.response?.data || "An error occurred");
      } else {
        showToast.error("An unexpected error occurred");
      }
    } finally {
      setIsFollowLoading(false);
    }
  }

  return (
    <div className="Vacation">
      <h3>{destination}</h3>

      {!isAdmin && user && (
        <button
          className={`follow-button ${isFollowing ? "following" : ""}`}
          onClick={handleFollowToggle}
          disabled={isFollowLoading}
        >
          {isFollowLoading ? (
            "loading..."
          ) : (
            <>
              {isFollowing ? "❤️" : "🤍"}
              <span className="count"> {followers.length} followers </span>
            </>
          )}
        </button>
      )}

      <div className="vacation-image">
        {imageUrl && !imageError && (
          <img
            src={
              imageUrl.startsWith("http")
                ? imageUrl
                : `${import.meta.env.VITE_AWS_SERVER_URL}/${imageUrl}`
            }
            alt={destination}
            onError={(e) => {
              console.error(`Failed to load image`);
              e.currentTarget.onerror = null;
              setImageError(true);
            }}
          />
        )}
        <div className="vacation-image">
          {imageUrl && !imageError && (
            <img
              src={
                imageUrl.startsWith("http")
                  ? imageUrl
                  : `${import.meta.env.VITE_AWS_SERVER_URL}/${imageUrl}`
              }
              alt={destination}
              onError={(e) => {
                console.error("Failed to load image", imageUrl);
                e.currentTarget.onerror = null;
                setImageError(true);
              }}
            />
          )}

          {imageError && (
            <div className="image-placeholder">Image Unavailable</div>
          )}
        </div>

        {imageError && (
          <div className="image-placeholder">Image Unavailable</div>
        )}

        {showDeleteConfirm && (
          <div className="delete-confirm-overlay">
            <p>
              Are you sure you want to delete this vacation to {destination}?
            </p>
            <div className="confirm-buttons">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={confirmDelete} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="vacation-dates">
        <p>From: {new Date(startingDate).toLocaleDateString()}</p>
        <p>To: {new Date(endingDate).toLocaleDateString()}</p>
      </div>

      <p className="vacation-description">{vacationDestination}</p>
      <p className="vacation-price">${price}</p>

      {isAdmin && (
        <div className="vacation-actions">
          <button onClick={editMe}>Edit</button>
          <button onClick={deleteMe}>Delete</button>
        </div>
      )}
    </div>
  );
}
