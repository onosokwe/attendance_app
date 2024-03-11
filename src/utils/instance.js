import axios from "axios";

const TOKEN = localStorage.getItem("kloka:token:data");

const instance = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
});


export default instance;
