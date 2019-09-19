export const createLogbook = logbook => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const logbookId = getState().firebase.auth.uid;
    firestore
      .collection("logbooks")
      .add({
        ...logbook,
        username: profile.username,
        logbookId: logbookId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_LOGBOOK", logbook });
      })
      .catch(err => {
        dispatch({ type: "CREATE_LOGBOOK_ERROR", err });
      });
  };
};
