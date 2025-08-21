export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  githubLink: string;
  linkedinLink: string;
  bio: string;
  stack: Array<string>;
}
