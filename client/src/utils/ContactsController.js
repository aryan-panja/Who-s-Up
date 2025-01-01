import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const userContacts = async() => {

    const data = localStorage.getItem('user');
    const token = JSON.parse(data).token;

    try{
        const response = await axios.get(`${URL}/api/contacts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('contacts', response);
        return response;

    }
    catch(error){
        console.log('contacts error', error);
    }
}

// finding the user by username 
// export const findUser = async(username) => {

//     const data = localStorage.getItem('user');
//     const token = JSON.parse(data).token;

//     try{
//         const response = await axios.post(`${URL}/api/contacts/global`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },

//         });
//         console.log('find user', response);
//         return response;

//     }
//     catch(error){
//         console.log('find user error', error);
//     }
// }

export const findUser = async(username) => {
    const data = localStorage.getItem('user');
    const token = JSON.parse(data).token;

    try{
        const response = await axios.post(`${URL}/api/contacts/global`, {
            username: username
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('find user', response);
        return response;

    }
    catch(error){
        console.log('find user error', error);
    }
}