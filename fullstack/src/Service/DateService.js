class DateService {
  isSaturday() {
    return new Date().getDay() === 6;
  }

  isSunday() {
    return new Date().getDay() === 0;
  }

  sundays() {
    const today = new Date();
    const ar = [];
    let dayToday = today.getDay();
    let diff = (7 - dayToday) % 7;
    // today = first sunday
    today.setDate(today.getDate() + diff);

    // saturday & after 11:59AM
    const saturdayCondition =
      this.isSaturday() &&
      new Date().toLocaleTimeString("en-US").split(" ")[1] === "PM";

    let numSundays;
    // if sunday OR (saturday AND time after 11:59 AM EST)
    if (this.isSunday() || saturdayCondition) {
      numSundays = 4;
      today.setDate(today.getDate() + 7);
    } else {
      numSundays = 3;
      ar.push("Sunday: " + today.toLocaleDateString());
      today.setDate(today.getDate() + 7);
    }

    for (let i = 0; i < numSundays; i++) {
      ar.push("Sunday: " + today.toLocaleDateString());
      today.setDate(today.getDate() + 7);
    }
    return ar;
  }

  closestUpcomingSunday() {
    const today = new Date();
    let dayToday = today.getDay();
    let diff = (7 - dayToday) % 7;
    // today = first sunday
    today.setDate(today.getDate() + diff);
    return ("Sunday: " + today.toLocaleDateString()); 
  }
}

export default new DateService();
