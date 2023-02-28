class MealData {
  // depends on zipcode entered by user
  data = [
    {
      id: 0,
      img: require("../../Resources/Meals/Palak Paneer.jpg"),
      mealName: "Palak Paneer Dhamaka ",
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
      img: require("../../Resources/Meals/New Paneer Tika.jpg"),
      mealName: "Toofani Paneer Tikka",
      description: {
        rotis: 4,
        saak: 2,
        gulabJamun: 1,
      },
      price: 12.99,
    },

    {
      id: 2,
      img: require("../../Resources/Meals/Chana Masala.jpg"),
      mealName: "Chataka Chana Masala",
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
      img: require("../../Resources/Meals/Aloo Gobi.jpg"),
      mealName: "Bazigar Aloo Gobi",
      description: {
        rotis: 4,
        saak: 2,
        rausagula: 1,
      },
      price: 12.99,
    },
    {
      id: 4,
      img: require("../../Resources/Meals/Bindi Masala.jpg"),
      mealName: "Banger Bhindi Express",
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
      img: require("../../Resources/Meals/ChocoBar.png"),
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
