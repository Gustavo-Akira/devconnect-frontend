export type onChangeAction = (field: keyof FormData, value: string | Array<string>) => void;
export type FormData = {
    name: string;
    email: string;
    password: string;
    address: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    githubLink: string;
    linkedinLink: string;
    bio: string;
    stack: string[];
    confirmPassword: string;
};
export type FormStepProps = {
    onChange: onChangeAction;
    data: FormData;
};
