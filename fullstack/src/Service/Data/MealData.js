class MealData {
  // depends on zipcode entered by user
  data = [
    {
      id: 0,
      img: require("../../Resources/Meals/meal1.png"),
      mealName: "Madrasi Thari ",
      // description: "Special Dish from South India",
      description: {
        sambhar: 2,
        idli: 3,
        chutney: 1,
      },
      price: 12.99,
    },

    {
      id: 1,
      img: require("../../Resources/Meals/meal2.png"),
      mealName: "Gujarati Thari",
      description: {
        rotis: 4,
        saak: 2,
        gulabJamun: 1,
      },
      price: 12.99,
    },

    {
      id: 2,
      img: require("../../Resources/Meals/meal3.png"),
      mealName: "Punjabi Thari",
      description: {
        rotis: 6,
        pannerSabji: 1,
        saak: 3,
        gulabJamun: 3,
        lassi: 1,
      },
      price: 12.99,
    },

    {
      id: 3,
      img: require("../../Resources/Meals/meal4.png"),
      mealName: "Benagali Thari",
      description: {
        rotis: 4,
        saak: 2,
        rausagula: 1,
      },
      price: 12.99,
    },
    {
      id: 4,
      img: require("../../Resources/Meals/paneer.png"),
      mealName: "Rajasthani Thari",
      description: {
        rotis: 4,
        saak: 2,
        rausagula: 1,
      },
      price: 12.99,
    },
    {
      id: 5,
      img: require("../../Resources/Meals/MangoDolly.png"),
      mealName: "Mango Dolly",
      description: {
        rotis: 4,
        saak: 2,
        rausagula: 1,
      },
      price: 2,
    },
    {
      id: 6,
      img: require("../../Resources/Meals/chocobar.png"),
      mealName: "Chocobar",
      description: {
        rotis: 4,
        saak: 2,
        rausagula: 1,
      },
      price: 2,
    },
  ];

  getNumberOfActualMeals() {
    return 5;
  }

  /**
   *
   * @returns everything including upsale items
   */
  getAllItems = () => {
    return this.data;
  };

  /**
   *
   * @returns returns ONLY meals
   */
  getMeals() {
    return this.data.slice(0, this.getNumberOfActualMeals());
  }

  getUpSaleItems() {
    return this.data.slice(this.getNumberOfActualMeals());
  }
}

export default new MealData();
