import MealData from "../Data/MealData";

const mealList = MealData.getMeals();

const add = (idNum,numMealsSelected,setNumMealsSelected,cart, setCart, cartPrice,setMealNumbers,setCartPrice,mealNumbers) => {
    setNumMealsSelected((numMealsSelected) => numMealsSelected + 1);
    setCartPrice(
      (cartPrice) =>
        Math.round(
          (cartPrice + MealData.getMeals()[idNum].price + Number.EPSILON) * 100
        ) / 100
    );
    // will have to add PRICE
    const addToCart = {
      id: idNum,
      mealName: mealList[idNum].mealName,
      description: mealList[idNum].description,
      price: mealList[idNum].price,
    };

    const tempArray = [];

    if (cart.length === 0) {
      // cart is empty
      tempArray.push(addToCart);
      setCart(tempArray);
    } else {
      // cart is NOT empty; 2 cases: idNum IS in cart OR NOT in the cart

      // don't wanna add duplicate items
      let found = false;

      cart.forEach((element) => {
        if (element.id === idNum) {
          found = true;
        }
        tempArray.push(element);
      });

      // adding item first time
      if (!found) {
        tempArray.push(addToCart);
      }
      setCart(tempArray); // Update cart to display correct items in cart
    }

    mealNumbers[idNum]++; // increment quantity in mealNumbers at index "idNum"
    const newAr = [];
    mealNumbers.map((item) => {
      newAr.push(item);
    });
    setMealNumbers(newAr); // Update mealNumbers to display correct quantity numbers in cart AND pickMeals page
  };


  const remove = (id,numMealsSelected,setNumMealsSelected,cart, setCart, cartPrice,setMealNumbers,setCartPrice,mealNumbers) => {
    // CANNOT have quantity < 0
    if (mealNumbers[id] > 0) {
      setNumMealsSelected((numMealsSelected) => numMealsSelected - 1);
      setCartPrice(
        (cartPrice) =>
          Math.round(
            (cartPrice - MealData.getMeals()[id].price + Number.EPSILON) * 100
          ) / 100
      );
      mealNumbers[id]--; // decrement quantity in mealNumbers at index "id"
      const newAr = [];
      mealNumbers.map((item) => {
        newAr.push(item);
      });
      setMealNumbers(newAr); // update mealNumbers

      if (mealNumbers[id] === 0) {
        // if item is reduced to 0 in cart, cart should be updated so we don't have an item in cart whose quantity = 0
        const tempCart = [];
        cart.forEach((element) => {
          if (element.id !== id) {
            tempCart.push(element);
          }
        });
        setCart(tempCart);
      }
    }
  };
export { add, remove};
