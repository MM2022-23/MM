class userSession {
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
