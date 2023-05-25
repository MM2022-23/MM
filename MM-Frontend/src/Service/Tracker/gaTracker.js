import ReactGA from "react-ga4";
const gaTracker = (category = "Event Category") => {
  const trackerEvent = (action = "action", label = "label") => {
    ReactGA.event({ category, action, label });
  };
  return trackerEvent;
};

export default gaTracker;
