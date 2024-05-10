type IAuthLogin = {
  password: string;
  email: string;
};

type IAuthRegistration = {
  password: string;
  email: string;
};

type IUser = {
  firstName: string;
  surname: string;
  gender: string;
  dateOfBirth: string;
  contactEmail: string;
  phoneNumber: string;
  imagePath: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
  countOfHouses: number;
  countOfComments: number;
  favoriteHouses: ICard[];
  rents: {house:ICard}[];
  houses: ICard[];
};

type IPersonalData = Omit<
  Partial<IUser, "cardNumber" | "cvv" | "expireDate" | "countOfComments" | "countOfComments">
>;

type IPaymentData = Omit<
  Partial<
    IUser,
    | "firstName"
    | "surname"
    | "gender"
    | "dateOfBirth"
    | "contactEmail"
    | "phoneNumber"
    | "imagePath"
    | "countOfHouses"
    | "countOfComments"
  >
>;

type IRent = {
  from:string;
  to:string;
  Price:number;
  houseId:number;
  cardNumber: string;
  expireDate: string;
  cvv: string;
}

type IAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type IError = {
  error: string;
};

type IFilterCard = {
  address: string;
  from: string;
  to: string;
  adult: number | null;
  childs: number | null;
  infants: number | null;
  pets: number | null;
};

type IImage = {
  id: number;
  isMain: boolean;
  path: string;
};

type ICategory = {
  id: number;
  name: string;
};

type ITags = {
  id: number;
  name: string;
};

type IAddress = {
  city: string;
  country: string;
  formattedAddress: string;
};

type ICard = {
  address: IAddress;
  babyCribs: number;
  bathrooms: number;
  beds: number;
  childBeds: number;
  description: string;
  id: number;
  images: IImage[];
  name: string;
  pets: number;
  price: number;
  rating: number;
  category: ICategory;
  tags: ITags[];
};

type ICreateHouse = {
  category: string;
  accomodationType: string;
  address: {
    country: string;
    city: string;
    addressLabel: string;
    formattedAddress: string;
    latitude: string;
    longitude: string;
  };
  beds: number;
  childBeds: number;
  babyCribs: number;
  pets: number;
  bathrooms: number;
  tags: string[];
  name: string;
  description: string;
  price: number;
  images: formData;
  mainImage: number;
};

type IHouse = {
  id: number;
  category: ICategory;
  accomodationType: string;
  address: {
    country: string;
    city: string;
    addressLabel: string;
    formattedAddress: string;
    latitude: string;
    longitude: string;
  };
  beds: number;
  childBeds: number;
  babyCribs: number;
  pets: number;
  bathrooms: number;
  tags: ITag[];
  name: string;
  description: string;
  price: number;
  images: IImage[];
  mainImage: number;
  rating: number;
  user:ICreator;
};

type ICreator = {
  email:string;
  firstName?: string;
  surname?: string;
  imagePath?: string;
  countOfHouses?: number;
  countOfComments?: number;
};

type ITag = {
  id: number;
  name:string;
};

type IImage = {
  id: number;
  path: string;
  isMain:boolean;
};

type IMainPageCards = {
  theMostPopular: ICard[];
  theBest: ICard[];
};
