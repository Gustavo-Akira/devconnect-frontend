export type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
  address: Address;
  githubLink: string;
  linkedinLink: string;
  stack: string[];
  isActive: boolean;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};
