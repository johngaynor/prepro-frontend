import {
  FETCH_PHYSIQUE_POSES,
  LOAD_PHYSIQUE_POSES,
  FETCH_EDIT_PHYSIQUE_PHOTO_POSE,
  LOAD_EDIT_PHYSIQUE_PHOTO_POSE,
  FETCH_PHYSIQUE_PHOTOS,
  LOAD_PHYSIQUE_PHOTOS,
  FETCH_DELETE_PHYSIQUE_PHOTO,
  LOAD_DELETE_PHYSIQUE_PHOTO,
  FETCH_ADD_PHYSIQUE_PHOTO,
  LOAD_ADD_PHYSIQUE_PHOTO,
} from "../../store/actionTypes";
import API from "../../services/api";

export function getPoses() {
  return API.get(
    "/api/physique/poses",
    "Error getting poses",
    (poses) => ({ type: LOAD_PHYSIQUE_POSES, poses }),
    () => ({ type: FETCH_PHYSIQUE_POSES })
  );
}

export function assignPose(photoId, poseId) {
  return API.post(
    "/api/physique/photos/pose",
    "Error assigning pose",
    {
      photoId,
      poseId,
    },
    (failed) => ({ type: LOAD_EDIT_PHYSIQUE_PHOTO_POSE, failed }),
    () => ({ type: FETCH_EDIT_PHYSIQUE_PHOTO_POSE, photoId, poseId })
  );
}

export function getPhotos() {
  return API.get(
    "/api/physique/photos",
    "Error getting physique photos",
    (photos) => ({ type: LOAD_PHYSIQUE_PHOTOS, photos }),
    () => ({ type: FETCH_PHYSIQUE_PHOTOS })
  );
}

export function deletePhoto(photoId) {
  return API.delete(
    `/api/physique/photo/${photoId}`,
    "Error deleting photo",
    (failed) => ({ type: LOAD_DELETE_PHYSIQUE_PHOTO, failed }),
    () => ({ type: FETCH_DELETE_PHYSIQUE_PHOTO, photoId })
  );
}

export function addPhoto(formData, checkInId) {
  formData.append("checkInId", checkInId);
  return API.post(
    "/api/physique/photos",
    "Error adding photos",
    formData,
    () => ({ type: LOAD_ADD_PHYSIQUE_PHOTO }),
    () => ({ type: FETCH_ADD_PHYSIQUE_PHOTO })
  );
}
