class MealData {
  // depends on zipcode entered by user
  data = [
    {
      id: 0,
      img: require("../../Resources/Meals/Palak Paneer.png"),
      mealName: "Palak Paneer Dhamaka",
      // description: "Special Dish from South India",
      description: "Soft paneer (a type of Indian cheese) cubes cooked in a creamy spinach gravy.",
      content: ["1 8oz Palak Paneer ", "1 8oz Masala Rice", "1 Tandoor Roti"],

      price: 12.99,
    },

    {
      id: 1,
      img: require("../../Resources/Meals/Paneer Tikka.png"),
      mealName: "Toofani Paneer Tikka",
      description:
      "Marinated cubes of paneer (a type of Indian cheese) that are simmered in a rich and creamy tomato-based gravy.",
      content: [
        "1 8oz Paneer Tikka Masala",

        "1 8oz Masala Rice",

        "1 Tandoor Roti",
      ],
      price: 12.99,
    },

    {
      id: 2,
      img: require("../../Resources/Meals/Chana Masala.png"),
      mealName: "Chataka Chana Masala",
      description: "Chickpeas cooked in a spicy and tangy tomato-based gravy.",
      content: ["1 8oz Chana Masala ", "1 8oz Masala Rice", "1 Tandoor Roti"],
      price: 12.99,
    },

    {
      id: 3,
      img: require("../../Resources/Meals/Aloo Gobi.png"),
      mealName: "Bazigar Aloo Gobi",
      description:
        "A dry curry made with potatoes (aloo) and cauliflower (gobi) that are cooked together with a blend of aromatic spices.",
      content: ["1 8oz Aloo Gobi ", "1 8oz Masala Rice", "1 Tandoor Roti"],
      price: 12.99,
    },
    {
      id: 4,
      img: require("../../Resources/Meals/Bhindi Masala.png"),
      mealName: "Jugadu Bhindi Express",
      description:
        "Okra cooked in a spicy and tangy tomato-based gravy along with onions and spices.",
      content: ["1 8oz Bhindi Masala ", "1 8oz Masala Rice", "1 Tandoor Roti"],
      price: 12.99,
    },
    {
      id: 5,
      img: require("../../Resources/Meals/MangoDolly.png"),
      mealName: "Mango Dolly",
      description:"Mango Dolly",
      content: [],
      price: 2,
    },
    {
      id: 6,
      img: require("../../Resources/Meals/ChocoBar.png"),
      mealName: "Chocobar",
      description: "Chocobar",
      content: [],
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
