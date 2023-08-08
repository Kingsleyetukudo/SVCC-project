const speakersReducer = (state, action) => {
  function upDateFavorite(favoriteValue) {
    return state.map((item, index) => {
      if (item.id === action.sessionId) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  }
  switch (action.type) {
    case "setSpeakerList": {
      return action.data;
    }
    case "favorite": {
      return upDateFavorite(true);
    }

    case "unfavorite": {
      return upDateFavorite(false);
    }
    default:
      return state;
  }
};

export default speakersReducer;
