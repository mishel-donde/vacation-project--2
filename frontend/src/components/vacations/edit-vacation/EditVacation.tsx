import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import VacationDraft from "../../../models/vacation/VacationDraft";
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { update } from "../../../redux/vacationsSlice";
import LoadingButton from "../../common/loading-button/LoadingButton";
import axios from "axios";
import { showToast } from "../../common/toast/Toast";

export default function EditVacation(): JSX.Element {
  // Track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Track loading status while data is being fetched
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Preview selected image
  const [previewImageSrc, setPreviewImageSrc] = useState("");

  // Extract vacation ID from the URL
  const { vacationId } = useParams<"vacationId">();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vacationsService = useService(VacationsService);

  const {
    register,
    handleSubmit,
    formState,
    reset,

    watch,
  } = useForm<VacationDraft>();

  // Track the starting date value
  const startingDate = watch("startingDate");

  // Set minimum end date to be after starting date
  const minEndDateString = startingDate
    ? new Date(
        new Date(startingDate).setDate(new Date(startingDate).getDate() + 1)
      )
        .toISOString()
        .split("T")[0]
    : "";

  // Get the vacation from Redux store (if already fetched)
  const vacation = useAppSelector((state) =>
    state.vacations.vacations.find((v) => v.vacationId === vacationId)
  );

  useEffect(() => {
    // Fetch vacation data from API
    async function loadVacationFromAPI() {
      try {
        if (vacationId) {
          const vacationData = await vacationsService.getVacation(vacationId);
          reset({
            destination: vacationData.destination,
            vacationDestination: vacationData.vacationDestination,
            startingDate: new Date(vacationData.startingDate)
              .toISOString()
              .split("T")[0],
            endingDate: new Date(vacationData.endingDate)
              .toISOString()
              .split("T")[0],
            price: vacationData.price,
          });
          if (vacationData.imageUrl) {
            setPreviewImageSrc(vacationData.imageUrl);
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          showToast.error(err.response?.data || "Error getting vacation data");
        } else {
          showToast.error("Failed to receive vacation data");
        }
        navigate("/vacations");
      } finally {
        setIsLoadingData(false);
      }
    }

    if (vacation) {
      // If already available in Redux
      setIsLoadingData(false);
      reset({
        destination: vacation.destination,
        vacationDestination: vacation.vacationDestination,
        startingDate: new Date(vacation.startingDate)
          .toISOString()
          .split("T")[0],
        endingDate: new Date(vacation.endingDate).toISOString().split("T")[0],
        price: vacation.price,
      });
      if (vacation.imageUrl) {
        setPreviewImageSrc(vacation.imageUrl);
      }
    } else {
      loadVacationFromAPI();
    }
  }, []);

  async function submit(draft: VacationDraft) {
    try {
      if (vacationId) {
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("destination", draft.destination);
        formData.append("vacationDestination", draft.vacationDestination);
        formData.append(
          "startingDate",
          new Date(draft.startingDate).toISOString()
        );
        formData.append("endingDate", new Date(draft.endingDate).toISOString());

        formData.append("price", draft.price.toString());

        if (draft.vacationImage && typeof draft.vacationImage !== "string") {
          const file = (draft.vacationImage as unknown as FileList)[0];
          formData.append("vacationImage", file);
        }

        const updatedVacation = await vacationsService.update(
          vacationId,
          formData
        );
        dispatch(update(updatedVacation));
        showToast.success(`Vacation to ${updatedVacation.destination} updated`);
        navigate("/vacations");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showToast.error(err.response?.data || "Something went wrong");
      } else {
        showToast.error("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Preview image when user selects one
  function previewImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setPreviewImageSrc(URL.createObjectURL(file));
    }
  }

  return (
    <div className="EditVacation">
      <h2>Edit Vacation</h2>

      {isLoadingData ? (
        <div className="loading-container">
          <LoadingButton message="Loading vacation data" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              {...register("destination", {
                required: "Destination is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
              })}
            />
            {formState.errors.destination && (
              <span className="error">
                {formState.errors.destination.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="vacationDestination">Description</label>
            <textarea
              id="vacationDestination"
              {...register("vacationDestination", {
                required: "Description is required",
                minLength: { value: 10, message: "Minimum 10 characters" },
              })}
            />
            {formState.errors.vacationDestination && (
              <span className="error">
                {formState.errors.vacationDestination.message}
              </span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startingDate">Start Date</label>
              <input
                type="date"
                {...register("startingDate", {
                  required: "Start date is required",
                })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endingDate">End Date</label>
              <input
                type="date"
                min={minEndDateString}
                {...register("endingDate", {
                  required: "End date is required",
                })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
                max: { value: 10000, message: "Price too high" },
              })}
            />
            {formState.errors.price && (
              <span className="error">{formState.errors.price.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="vacationImage">Cover Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              {...register("vacationImage")}
              onChange={previewImage}
            />
            {previewImageSrc && (
              <div className="image-preview">
                <img src={previewImageSrc} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/vacations")}
              className="btn-cancel"
            >
              Cancel
            </button>
            {isSubmitting ? (
              <LoadingButton message="Updating..." />
            ) : (
              <button type="submit" className="btn-submit">
                Update Vacation
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
