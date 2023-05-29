import DataCollectionAPIService from "../APICalls/DataCollectionAPIService";

class userSession {
  removeSessionID = () => {
    if (this.getSessionID()) {
      localStorage.removeItem("mirchiMealsSessionID");
    }
  };

  addSessionID = (comingFrom) => {
    const now = new Date();
    const options = { timeZone: "America/New_York" };
    const dateTimeEST = now.toLocaleString("en-US", options);
    DataCollectionAPIService.createSession({fbInfo:comingFrom,time:dateTimeEST}).then((response)=>{
      localStorage.setItem("mirchiMealsSessionID", response.data);
    });
  };

  getSessionID = () => {
    return localStorage.getItem("mirchiMealsSessionID");
  };

  isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };
  getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  addUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  removeUser() {
    if (this.isLoggedIn()) {
      localStorage.removeItem("user");
    }
  }

  // ENABLE CACHING IF there is issue in updating user's login creds
  // cache(obj) {
  //   localStorage.setItem("updateCache", JSON.stringify(obj));
  // }

  // getCache() {
  //   return JSON.parse(localStorage.getItem("updateCache"));
  // }
  // removeCache() {
  //   localStorage.removeItem("updateCache");
  // }
}

export default new userSession();
