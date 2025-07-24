import { mutation } from "./_generated/server";

export const seedItems = mutation({
  args: {},
  handler: async (ctx) => {
    const items = [
      {
        name: "Classic Club",
        ingredients: ["Turkey", "Bacon", "Lettuce", "Tomato", "Mayo"],
        price: 12.99,
        inventory: 20,
        description: "A triple-decker delight with turkey, bacon, and fresh vegetables.",
        isActive: true,
      },
      {
        name: "Italian Sub",
        ingredients: ["Salami", "Pepperoni", "Provolone", "Lettuce", "Tomato", "Italian Dressing"],
        price: 11.99,
        inventory: 15,
        description: "Authentic Italian flavors with premium deli meats.",
        isActive: true,
      },
      {
        name: "Veggie Delight",
        ingredients: ["Cucumber", "Bell Peppers", "Avocado", "Spinach", "Hummus"],
        price: 9.99,
        inventory: 25,
        description: "Fresh and healthy vegetarian option packed with vegetables.",
        isActive: true,
      },
      {
        name: "BBQ Pulled Pork",
        ingredients: ["Pulled Pork", "BBQ Sauce", "Coleslaw", "Pickles"],
        price: 13.99,
        inventory: 10,
        description: "Slow-cooked pork with tangy BBQ sauce and crunchy coleslaw.",
        isActive: true,
      },
      {
        name: "Chicken Caesar",
        ingredients: ["Grilled Chicken", "Romaine Lettuce", "Parmesan", "Caesar Dressing", "Croutons"],
        price: 10.99,
        inventory: 18,
        description: "Classic Caesar salad in sandwich form with grilled chicken.",
        isActive: true,
      },
      {
        name: "Reuben",
        ingredients: ["Corned Beef", "Sauerkraut", "Swiss Cheese", "Russian Dressing"],
        price: 14.99,
        inventory: 12,
        description: "Traditional Reuben with tender corned beef and tangy sauerkraut.",
        isActive: true,
      },
    ];

    const results = [];
    for (const item of items) {
      const id = await ctx.db.insert("items", item);
      results.push(id);
    }

    return results;
  },
});