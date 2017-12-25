import axios from 'axios'; 
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1haWxAbm9lbWFpbC5jb20.fGbjTahMFHe9Ad330JH5HfkhNuP4FdXICuQHgKS9Xag';
axios.defaults.headers.get['Content-Type'] = 'application/json';

export const TOGGLE_MENU = 'toggleMenu';
export const FETCH_ALL_BOOKS = 'fetchAllBooks';
export const FETCH_ALL_PUBLICATIONS = 'fetchAllPublications';
export const FETCH_ALL_CATEGORIES = 'fetchAllCategories';
export const FETCH_ALL_AUTHORS = 'fetchAllAuthors';
export const CREATE_BOOK = 'createBook';

const ROOT_URL = "https://bookstore-trial.herokuapp.com/api";

export function toggleMenu(){   
    return{
        type:TOGGLE_MENU        
    }
}

export function fetchAllBooks(){   
    const request = axios.get(`${ROOT_URL}/books`)
    return{
        type: FETCH_ALL_BOOKS,
        payload: request
        
    }
}

export function fetchAllPublications(){   
    const request = axios.get(`${ROOT_URL}/publications`)
    return{
        type: FETCH_ALL_PUBLICATIONS,
        payload: request
        
    }
}

export function fetchCategories(){   
    const request = axios.get(`${ROOT_URL}/categories`)
    return{
        type: FETCH_ALL_CATEGORIES,
        payload: request
        
    }
}


export function fetchAllAuthors(){   
    const request = axios.get(`${ROOT_URL}/authors`)
    return{
        type: FETCH_ALL_AUTHORS,
        payload: request
        
    }
}

export function createBook(values, callback){
    //api requires array of books, so creating array and then sending
    const books = new Array();
    console.log(values.yop)
    values.yop = "2017";
    console.log(values)
    books.push(values);
    const request = axios.post(`${ROOT_URL}/book`, books).then(()=> callback() );
    return {
        type: CREATE_BOOK,
        payload:request
    }
}