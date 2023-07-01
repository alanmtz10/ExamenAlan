import { array, date, number, object, string } from "yup";

const employeeScheme = object({
    name: string().required(),
    email: string().email().required(),
    position: string().required(),
    birthdate: date().required(),
    home: string().required(),
    skills: array().of(object({
        name: string().required(),
        level: number().integer().min(1).max(5).required(),
    })).required(),
});

export default employeeScheme;
