export type UpdateProfileRequest = {
  id: string;
  name: string;
  email: string;
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  githubLink: string;
  linkedinLink: string;
  bio: string;
  stack: string[];
};
