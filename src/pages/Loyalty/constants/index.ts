import Loyalty_card1 from "@/assets/images/Loyalty_card1.webp";
import Loyalty_card2 from "@/assets/images/Loyalty_card2.webp";
import Loyalty_card3 from "@/assets/images/Loyalty_card3.webp";

export const guidances = [
  {
    number: "1",
    title: "Registration and first tenancy",
    info: "Register online and make your first rental to receive your Traveler's Card",
  },
  {
    number: "2",
    title: "Active use of the service",
    info: "The more often you book accommodation through our website, the more bonuses you will earn",
  },
  {
    number: "3",
    title: "Progress tracking",
    info: "In your personal account you can track your progress and the number of bonuses the next level",
  },
  {
    number: "4",
    title: "Moving to the next level",
    info: "Once you accumulate enough bonuses, your card will automatically upgrade to an Explorer's Card and then to a Globetrotter's Card",
  },
  {
    number: "5",
    title: "Use of privileges",
    info: "With each new level, you get more and more benefits and bonuses that make your journey even more enjoyable",
  },
  {
    number: "6",
    title: "Bonus exchange",
    info: "Redeem your accumulated bonuses for discounts or additional services to enhance your stay",
  },
];

export const accordionData = [
  {
    id: 1,
    question: "How can I join the loyalty programme?",
    answer:
      "Joining the loyalty programme is very easy! You need to register on our website and make your first rental. After that you will automatically receive a Traveler's Loyalty Card.",
  },
  {
    id: 2,
    question: "What are the benefits of the Traveler's Card?",
    answer:
      "With a Traveler's Card, you get a discount on your first rental, access to exclusive offers and priority customer support.",
  },
  {
    id: 3,
    question: "Can I use the bonuses all at once?",
    answer:
      "Yes, your rewards are activated as soon as you receive your card and can be used on your next booking.",
  },
  {
    id: 4,
    question: "How do I switch to Explorer's or Globetrotter's Cards?",
    answer:
      "Your card level increases automatically when you reach a certain number of bookings. The more you travel, the higher your level.",
  },
  {
    id: 5,
    question: "Do my bonuses have an expiry date?",
    answer:
      "No, your bonuses have no expiry date and will stay with you as long as you are a member of the loyalty programme.",
  },
];

export const cardData = [
  {
    title: "Traveler’s Card",
    status: "New user",
    description: "Automatically issued upon first rental",
    benefits: [
      "5% discount on the first rental",
      "Access to exclusive offers and promotions",
      "Priority customer support",
    ],
    imgSrc: Loyalty_card1,
  },
  {
    title: "Explorer’s Card",
    status: "Regular customer",
    description: "10 bookings on our website are required",
    benefits: [
      "10% discount on every rental",
      "Book 7 days, get 1 day free",
      "Access to VIP offers and special events",
    ],
    imgSrc: Loyalty_card2,
  },
  {
    title: "Globetrotter’s Card",
    status: "VIP customer",
    description: "20 bookings on our website are required",
    benefits: [
      "15% discount on all rentals",
      "Personal manager to service your bookings",
      "Exclusive gifts and surprises from partners",
    ],
    imgSrc: Loyalty_card3,
  },
];
