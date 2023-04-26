class MealData {
  // depends on zipcode entered by user
  data = [
    {
      id: 0,
      img: require("../../Resources/Meals/Palak Paneer.jpg"),
      mealName: "Palak Paneer",
      // description: "Special Dish from South India",
      description:
        "Soft paneer (a type of Indian cheese) cubes cooked in a creamy spinach gravy.",
      content: [
        "8oz Palak Paneer ",
        "8oz Masala Rice",
        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],

      price: 12.99,
    },

    {
      id: 1,
      img: require("../../Resources/Meals/Paneer Tikka.jpg"),
      mealName: "Paneer Tikka",
      description:
        "Marinated cubes of paneer (a type of Indian cheese) that are simmered in a rich and creamy tomato-based gravy.",
      content: [
        "8oz Paneer Tikka Masala",

        "8oz Masala Rice",

        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],
      price: 12.99,
    },

    {
      id: 2,
      img: require("../../Resources/Meals/Chana Masala.jpg"),
      mealName: "Chana Masala",
      description: "Chickpeas cooked in a spicy and tangy tomato-based gravy.",
      content: [
        "8oz Chana Masala ",
        "8oz Masala Rice",
        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],
      price: 12.99,
    },

    {
      id: 3,
      img: require("../../Resources/Meals/Aloo Gobi.jpg"),
      mealName: "Bazigar Aloo Gobi",
      description:
        "A dry curry made with potatoes (aloo) and cauliflower (gobi) that are cooked together with a blend of aromatic spices.",
      content: [
        "8oz Aloo Gobi ",
        "8oz Masala Rice",
        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],
      price: 12.99,
    },
    {
      id: 4,
      img: require("../../Resources/Meals/Baigan Bharta.jpg"),
      mealName: "Best Baigan Bharta",
      description:
        "Grilled eggplant minced into curry consisting of authentic herbs and spices.",
      content: [
        "8oz Baigan Bharta ",
        "8oz Masala Rice",
        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],
      price: 12.99,
    },
    {
      id: 5,
      img: require("../../Resources/Meals/Rajma.jpg"),
      mealName: "Royal Rajma Express",
      description:
        "Kidney beans cooked in a spicy and tangy tomato-based gravy along with onions and spices.",
      content: [
        "8oz Rajma ",
        "8oz Masala Rice",
        "Tandoor Roti",
        "6oz Amul Buttermilk Drink",
      ],
      price: 12.99,
    },
    {
      id: 6,
      img: require("../../Resources/Meals/MangoDolly.png"),
      mealName: "Mango Dolly",
      description: "Delightfully creamy vanilla ice cream bar enveloped in a mango coating",
      content: ["Mango dolly"],
      price: 2,
    },
    {
      id: 7,
      img: require("../../Resources/Meals/ChocoBar.png"),
      mealName: "Chocobar",
      description: "Savory ice cream bar with a vanilla ice cream center and chocolate exterior",
      content: ["Chocobar"],
      price: 2,
    },
  ];

  getNumberOfActualMeals() {
    return 6;
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
