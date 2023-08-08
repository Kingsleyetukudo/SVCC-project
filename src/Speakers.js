import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";
import speakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import speakersReducer from "./SpeakerReducer";

const Speakers = ({}) => {
  // const [speakerList, setSpeakerList] = useState([]);
  const [speakerList, dispatch] = useReducer(speakersReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  const context = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      // setSpeakerList(speakerData);
      setIsLoading(false);
      const speakerListFilter = speakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });
      dispatch({
        type: "setSpeakerList",
        data: speakerListFilter,
      });
      return () => {
        console.log("cleanup");
      };
    });
  }, []);

  const handleChnageSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChnageSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };
  const newSpeakerList = useMemo(
    () =>
      speakerList
        .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return 1;
          }
          if (a.firstName > b.firstName) {
            return 0;
          }
        }),
    [speakingSaturday, speakingSunday, speakerList]
  );

  const speakListFiltered = isLoading ? [] : newSpeakerList;

  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes[`data-sessionid`].value);

    dispatch({
      type: favoriteValue === true ? "favorite" : "unfavorite",
      sessionId,
    });
    // setSpeakerList(
    //   speakerList.map((item) => {
    //     if (item.id === sessionId) {
    //       return { ...item, favorite: favoriteValue };
    //     }
    //     return item;
    //   })
    // );
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChnageSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChnageSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
