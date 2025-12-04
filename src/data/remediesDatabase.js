export const remediesDatabase = [
    {
        id: 'dandruff',
        symptoms: ['dandruff', 'itchy scalp', 'white flakes', 'dry scalp'],
        remedies: [
            "Apply curd (yogurt) on scalp for 30 mins before washing.",
            "Massage with warm coconut oil mixed with lemon juice.",
            "Use neem water rinse after shampooing.",
            "Apply aloe vera gel to reduce itching and dryness."
        ],
        dietary_tips: "Reduce sugar and yeast intake; eat more zinc-rich foods (nuts, seeds).",
        warning: "If scalp is red or bleeding, consult a dermatologist (could be psoriasis)."
    },
    {
        id: 'ear_pain',
        symptoms: ['ear pain', 'earache', 'blocked ear', 'ear infection'],
        remedies: [
            "Apply a warm compress (cloth dipped in warm water) to the ear.",
            "Put 1-2 drops of warm garlic oil (if eardrum is intact).",
            "Chew gum to relieve pressure if caused by altitude/travel.",
            "Keep the ear dry and avoid inserting cotton buds."
        ],
        dietary_tips: "Avoid cold foods like ice cream that might aggravate sinus-related ear pain.",
        warning: "Do not put oil if there is discharge; see a doctor immediately for severe pain."
    },
    {
        id: 'stomach_pain',
        symptoms: ['stomach pain', 'stomach ache', 'indigestion', 'cramps'],
        remedies: [
            "Drink warm water with ginger and honey.",
            "Chew on carom seeds (ajwain) with a pinch of black salt.",
            "Apply a warm heating pad to the stomach area.",
            "Drink peppermint tea to relax stomach muscles."
        ],
        dietary_tips: "Eat light foods like curd rice or khichdi; avoid spicy/oily meals.",
        warning: "Seek help if pain is severe, on the right side (appendix), or accompanied by fever."
    },
    {
        id: 'hair_fall',
        symptoms: ['hair fall', 'hair loss', 'thinning hair'],
        remedies: [
            "Massage scalp with warm coconut oil mixed with curry leaves.",
            "Apply onion juice to the scalp for 15 mins before washing.",
            "Use an egg white mask once a week for protein boost.",
            "Increase intake of iron-rich foods like spinach and dates."
        ],
        dietary_tips: "Eat foods rich in Biotin (eggs, almonds) and Vitamin E.",
        warning: "If hair fall is sudden and excessive, consult a dermatologist."
    },
    {
        id: 'leg_pain',
        symptoms: ['leg pain', 'calf pain', 'muscle cramps', 'knee pain'],
        remedies: [
            "Soak legs in warm water with Epsom salt for 15 mins.",
            "Massage with mustard oil infused with garlic.",
            "Elevate your legs while sleeping to improve circulation.",
            "Perform gentle stretching exercises before bed."
        ],
        dietary_tips: "Ensure adequate Calcium and Magnesium intake (bananas, milk).",
        warning: "Persistent pain could indicate DVT or sciatica; see a doctor if swelling occurs."
    },
    {
        id: 'cold_cough',
        symptoms: ['cold', 'cough', 'sore throat', 'runny nose', 'flu'],
        remedies: [
            "Drink warm turmeric milk (Golden Milk) before sleep.",
            "Gargle with warm salt water 3 times a day.",
            "Consume a mixture of ginger juice and honey.",
            "Steam inhalation with eucalyptus oil."
        ],
        dietary_tips: "Avoid cold dairy and sugary foods; eat warm soups.",
        warning: "Seek medical help if high fever persists for > 2 days."
    },
    {
        id: 'acidity',
        symptoms: ['acidity', 'heartburn', 'gas', 'bloating'],
        remedies: [
            "Drink a glass of cold milk (without sugar).",
            "Chew on a few fennel seeds (saunf) after meals.",
            "Drink warm water with a pinch of asafoetida (hing).",
            "Sip on ginger tea."
        ],
        dietary_tips: "Avoid spicy, fried foods and caffeine.",
        warning: "Chronic acidity can lead to ulcers; monitor frequency."
    },
    {
        id: 'headache',
        symptoms: ['headache', 'migraine', 'stress', 'head pain'],
        remedies: [
            "Apply a paste of ginger powder and water on the forehead.",
            "Massage temples with peppermint oil.",
            "Practice deep breathing or meditation in a dark room.",
            "Drink plenty of water (dehydration often causes headaches)."
        ],
        dietary_tips: "Avoid skipping meals; limit caffeine withdrawal.",
        warning: "Severe, sudden headaches need immediate medical attention."
    },
    {
        id: 'insomnia',
        symptoms: ['sleeplessness', 'insomnia', 'trouble sleeping'],
        remedies: [
            "Drink warm milk with a pinch of nutmeg before bed.",
            "Massage feet with warm oil (Padabhyanga).",
            "Avoid screens (blue light) 1 hour before sleep.",
            "Listen to calming white noise or rain sounds."
        ],
        dietary_tips: "Avoid heavy dinners and caffeine after 4 PM.",
        warning: "Chronic insomnia affects long-term health."
    }
];

export const healthTips = {
    weight_loss: [
        "Drink 500ml water 30 mins before meals to reduce appetite.",
        "Switch to high-protein breakfasts (eggs, moong dal chilla).",
        "Replace refined sugar with jaggery or honey (in moderation).",
        "Practice 'Hara Hachi Bu' - eat until 80% full."
    ],
    weight_gain: [
        "Include healthy fats like nuts, avocados, and ghee.",
        "Eat calorie-dense foods like bananas, dates, and smoothies.",
        "Increase protein intake to build muscle, not just fat.",
        "Eat more frequently (5-6 meals a day)."
    ],
    general: [
        "Walk for 10 minutes after every meal to aid digestion.",
        "Follow the 20-20-20 rule for eye strain (look 20ft away every 20 mins).",
        "Sunlight exposure for 15 mins daily for Vitamin D.",
        "Stay hydrated - thirst is often confused with hunger."
    ]
};
