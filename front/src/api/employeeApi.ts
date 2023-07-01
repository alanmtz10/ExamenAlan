import axios from "axios"

const BACKEND_URL = "http://localhost/api"


const indexEmployees = async () => {
    return axios.get(`${BACKEND_URL}/employees`);
};

const showEmployee = async (id: number) => {
    return axios.get(`${BACKEND_URL}/employees/${id}`);
};

const storeEmployee = async (data: object) => {
    return axios.post(`${BACKEND_URL}/employees`, data);
}

const deleteEmployee = async (id: number) => {
    return axios.delete(`${BACKEND_URL}/employees/${id}`);
}

export {
    indexEmployees,
    showEmployee,
    storeEmployee,
    deleteEmployee
};
