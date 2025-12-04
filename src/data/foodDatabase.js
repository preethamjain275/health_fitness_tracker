export const foodDatabase = [
    {
        id: 'panipuri',
        name: 'Panipuri (6 pcs)',
        calories: 330,
        type: 'veg',
        protein: '4g',
        carbs: '42g',
        fat: '12g',
        advantages: [
            "Refreshing and mood-lifting",
            "Contains digestive spices like cumin and mint",
            "Source of quick energy"
        ],
        disadvantages: [
            "High in sodium and unhealthy fats",
            "Deep-fried puries add empty calories",
            "Hygienic concerns if street-bought"
        ],
        rating: 4.5, // Taste rating
        healthScore: 3, // Out of 10
        category: 'Snack'
    },
    {
        id: 'chapati',
        name: 'Chapati (1 medium)',
        calories: 104,
        type: 'veg',
        protein: '3g',
        carbs: '18g',
        fat: '3g',
        advantages: [
            "Good source of complex carbohydrates",
            "Provides sustained energy",
            "Low in fat if made without oil/ghee"
        ],
        disadvantages: [
            "Contains gluten (not suitable for celiac)",
            "Calorie dense if consumed in large quantities"
        ],
        rating: 8,
        healthScore: 9,
        category: 'Main Course'
    },
    {
        id: 'chicken_curry',
        name: 'Chicken Curry (1 bowl)',
        calories: 243,
        type: 'non-veg',
        protein: '22g',
        carbs: '8g',
        fat: '14g',
        advantages: [
            "Excellent source of high-quality protein",
            "Rich in vitamins B6 and B12",
            "Helps in muscle building"
        ],
        disadvantages: [
            "Can be high in saturated fats depending on preparation",
            "Spicy versions may cause acidity"
        ],
        rating: 9,
        healthScore: 8,
        category: 'Main Course'
    },
    {
        id: 'dal_tadka',
        name: 'Dal Tadka (1 bowl)',
        calories: 198,
        type: 'veg',
        protein: '10g',
        carbs: '24g',
        fat: '7g',
        advantages: [
            "Great plant-based protein source",
            "High in fiber aiding digestion",
            "Comforting and filling"
        ],
        disadvantages: [
            "Tempering (tadka) adds extra oil/ghee",
            "Can cause bloating in some people"
        ],
        rating: 8.5,
        healthScore: 9,
        category: 'Main Course'
    },
    {
        id: 'rice',
        name: 'White Rice (1 bowl)',
        calories: 205,
        type: 'veg',
        protein: '4g',
        carbs: '44g',
        fat: '0.4g',
        advantages: [
            "Easily digestible",
            "Instant energy source",
            "Gluten-free"
        ],
        disadvantages: [
            "High glycemic index (spikes blood sugar)",
            "Low in fiber compared to brown rice"
        ],
        rating: 7,
        healthScore: 6,
        category: 'Main Course'
    },
    {
        id: 'apple',
        name: 'Apple (1 medium)',
        calories: 95,
        type: 'veg',
        protein: '0.5g',
        carbs: '25g',
        fat: '0.3g',
        advantages: [
            "Rich in fiber and Vitamin C",
            "Promotes heart health",
            "Aids in weight loss"
        ],
        disadvantages: [
            "Contains natural sugars (fructose)",
            "Pesticide residue if not washed well"
        ],
        rating: 9,
        healthScore: 10,
        category: 'Fruit'
    },
    {
        id: 'egg_boiled',
        name: 'Boiled Egg (1 large)',
        calories: 78,
        type: 'non-veg',
        protein: '6g',
        carbs: '0.6g',
        fat: '5g',
        advantages: [
            "Complete protein source",
            "Rich in choline (brain health)",
            "Keeps you full for longer"
        ],
        disadvantages: [
            "Yolk is high in cholesterol (limit if needed)",
            "Potential allergen"
        ],
        rating: 8,
        healthScore: 9.5,
        category: 'Breakfast'
    },
    {
        id: 'samosa',
        name: 'Samosa (1 piece)',
        calories: 262,
        type: 'veg',
        protein: '3.5g',
        carbs: '24g',
        fat: '17g',
        advantages: [
            "Delicious comfort food",
            "Filling snack"
        ],
        disadvantages: [
            "Deep-fried and high in trans fats",
            "Refined flour (maida) is hard to digest",
            "Very low nutrient density"
        ],
        rating: 9,
        healthScore: 2,
        category: 'Snack'
    }
];
