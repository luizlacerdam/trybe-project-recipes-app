// action type
export const SAVE_USER = 'SAVE_USER';

// action creator
export const saveUser = (userData) => ({
  type: SAVE_USER,
  userData,
});
