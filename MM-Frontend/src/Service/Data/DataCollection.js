import userSession from "./userSession";
import DataCollectionAPIService from "../APICalls/DataCollectionAPIService";

class DataCollection {
  registerActivity = (pageName, Activity) => {
    const dataToSend = {
      sessionID: userSession.getSessionID(),
      pageView: pageName,
      activity: Activity,
    };
    DataCollectionAPIService.pageViewCollect(dataToSend)
      .then((r) => {})
      .catch((err) => {});
  };
}

export default new DataCollection();
