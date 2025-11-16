export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: "Travel" | "Food" | "Home" | "Community";
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
}

export const challenges: Challenge[] = [
  {
    id: "straw",
    title: "No Plastic Straw",
    description: "Forgo a plastic straw when ordering a drink.",
    points: 20,
    category: "Food",
  },
  {
    id: "bottle",
    title: "Reusable Bottle",
    description: "Use a reusable bottle instead of a single-use plastic one.",
    points: 15,
    category: "Food",
  },
  {
    id: "bag",
    title: "Reusable Bag",
    description: "Use a reusable bag for your shopping.",
    points: 20,
    category: "Home",
  },
  {
    id: "lunch",
    title: "Pack Your Lunch",
    description: "Pack your lunch in reusable containers.",
    points: 40,
    category: "Food",
  },
  {
    id: "coffee",
    title: "Reusable Coffee Cup",
    description: "Use a reusable cup for your coffee.",
    points: 35,
    category: "Food",
  },
  {
    id: "plastic-free",
    title: "Plastic-Free Purchase",
    description: "Buy a product with no plastic packaging.",
    points: 50,
    category: "Home",
  },
  {
    id: "cleanup",
    title: "Join a Cleanup",
    description: "Participate in a local cleanup event.",
    points: 100,
    category: "Community",
  },
  {
    id: "recycle",
    title: "Recycle Right",
    description: "Sort your recyclables correctly.",
    points: 80,
    category: "Home",
  },
  {
    id: "compost",
    title: "Compost Food Scraps",
    description: "Compost your food scraps for a week.",
    points: 90,
    category: "Home",
  },
];

export const rewards: Reward[] = [
  {
    id: "discount-5",
    title: "5% Off Voucher",
    description: "Get a 5% discount at a partner store.",
    points: 100,
  },
  {
    id: "discount-10",
    title: "10% Off Voucher",
    description: "Get a 10% discount at a partner store.",
    points: 250,
  },
  {
    id: "coffee-voucher",
    title: "Free Coffee",
    description: "Get a free coffee at a partner cafe.",
    points: 150,
  },
  {
    id: "tree-planted",
    title: "Plant a Tree",
    description: "We'll plant a tree on your behalf.",
    points: 200,
  },
  {
    id: "discount-20",
    title: "20% Off Voucher",
    description: "Get a 20% discount at a partner store.",
    points: 500,
  },
  {
    id: "cleanup-kit",
    title: "Cleanup Kit",
    description: "Receive a kit with gloves, bags, and a picker.",
    points: 300,
  },
  {
    id: "water-bottle",
    title: "Reusable Water Bottle",
    description: "A stylish and durable reusable water bottle.",
    points: 400,
  },
  {
    id: "tote-bag",
    title: "Eco-Friendly Tote Bag",
    description: "A tote bag made from recycled materials.",
    points: 180,
  },
];
