import axios from 'axios'

const BASE_URL = `http://jservice.io/`

export const getClues = () => {
    return axios
        .get(`${BASE_URL}api/clues`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
        });
};