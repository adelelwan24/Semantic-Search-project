import axios from 'axios';

export default axios.create({
    // put the development backend will run at which port 
    baseURL: 'http://localhost:3005'
})