export declare const useSignupPage: () => {
    actions: {
        handleSignup: () => void;
        setFormData: import("react").Dispatch<import("react").SetStateAction<{
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
            stack: never[];
            confirmPassword: string;
        }>>;
        setActiveStep: import("react").Dispatch<import("react").SetStateAction<number>>;
        handleNext: () => void;
        handleBack: () => void;
    };
    state: {
        formData: {
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
            stack: never[];
            confirmPassword: string;
        };
        steps: string[];
        activeStep: number;
    };
};
