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

const DEFAULT_STATE = {
  poses: null,
  posesLoading: false,
  photos: null,
  photosLoading: false,
  editLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PHYSIQUE_POSES:
      return { ...state, posesLoading: true };
    case LOAD_PHYSIQUE_POSES:
      return { ...state, poses: action.poses, posesLoading: false };
    case FETCH_EDIT_PHYSIQUE_PHOTO_POSE:
      // update locally
      const newPoses = state.photos.map((p) => {
        if (p.id === action.photoId) {
          return { ...p, poseId: action.poseId };
        }
        return { ...p };
      });
      return { ...state, editLoading: true, photos: newPoses };
    case LOAD_EDIT_PHYSIQUE_PHOTO_POSE:
      // handle failure case
      return {
        ...state,
        editLoading: false,
        photos: action.failed ? null : state.photos,
      };
    case FETCH_PHYSIQUE_PHOTOS:
      return { ...state, photosLoading: true };
    case LOAD_PHYSIQUE_PHOTOS:
      return { ...state, photos: action.photos, photosLoading: false };
    case FETCH_DELETE_PHYSIQUE_PHOTO:
      // update locally
      const newPhotos = state.photos.filter((p) => p.id !== action.photoId);
      return { ...state, editLoading: true, photos: newPhotos };
    case LOAD_DELETE_PHYSIQUE_PHOTO:
      // handle failure case
      return {
        ...state,
        editLoading: false,
        photos: action.failed ? null : state.photos,
      };
    case FETCH_ADD_PHYSIQUE_PHOTO:
      return { ...state, editLoading: true };
    case LOAD_ADD_PHYSIQUE_PHOTO:
      return { ...state, editLoading: false, photos: null };
    default:
      return state;
  }
};
