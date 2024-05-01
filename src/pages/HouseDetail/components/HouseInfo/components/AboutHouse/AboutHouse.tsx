import "./AboutHouse.scss";

type AboutHouseProp = {
  house: IHouse;
};

export const AboutHouse: React.FC<AboutHouseProp> = ({ house }: AboutHouseProp) => {
  return <div className="about-house">{house.description}</div>;
};
