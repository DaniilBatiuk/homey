import { ICONS } from "@/constants";

export const getBenefitIcon = (benefitText: string) => {
  switch (benefitText) {
    case '5% discount on the first rental':
      return <ICONS.bonuses_loyalty />;
    case 'Access to exclusive offers and promotions':
      return <ICONS.star_loyalty />;
    case 'Priority customer support':
      return <ICONS.suport_loyalty />;
    case '10% discount on every rental':
      return <ICONS.bonuses10_loyalty />;
    case 'Book 7 days, get 1 day free':
      return <ICONS.book_loyalty />;
    case 'Access to VIP offers and special events':
      return <ICONS.access_loyalty />;
    case '15% discount on all rentals':
      return <ICONS.bonuses15_loyalty />;
    case 'Personal manager to service your bookings':
      return <ICONS.personal_loyalty />;
    case 'Exclusive gifts and surprises from partners':
      return <ICONS.exlusive_loyalty />;
    default:
      return null;
  }
};