import { ReactNode } from "react";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: "Food" | "Home" | "Community";
  points: number;
  queries: string[]; // OWL-ViT search terms for validation
  icon?: ReactNode
}


export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
}

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
