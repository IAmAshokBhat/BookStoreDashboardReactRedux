import axios from 'axios'; 
axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.ZW1haWxAbm9lbWFpbC5jb20.fGbjTahMFHe9Ad330JH5HfkhNuP4FdXICuQHgKS9Xag';
axios.defaults.headers.get['Content-Type'] = 'application/json';

export const TOGGLE_MENU = 'toggleMenu';
export const FETCH_ALL_BOOKS = 'fetchAllBooks';
export const FETCH_ALL_PUBLICATIONS = 'fetchAllPublications';
export const FETCH_ALL_CATEGORIES = 'fetchAllCategories';
export const FETCH_ALL_AUTHORS = 'fetchAllAuthors';
export const CREATE_BOOK = 'createBook';
export const FETCH_BOOK = 'fetchBook';
export const UPDATE_BOOK = 'updateBook';
export const DELETE_PUBLICATION = 'deletePublication';
export const DELETE_CATEGORY = 'deleteCategory';
export const DELETE_AUTHOR = 'deleteAuthor';
export const UPDATE_AUTHOR = 'updateAuthor';
export const UPDATE_CATEGORY = 'updateCategory';
export const UPDATE_PUBLICATION = 'updatePublication';
export const ADD_AUTHOR = 'addAuthor';
export const ADD_CATEGORY = 'addCategory';
export const ADD_PUBLICATION = 'addPublication';
export const INSERT_AUTHOR = 'insertNewAuthor';
export const INSERT_CATEGORY = 'insertNewCategory';
export const INSERT_PUBLICATION = 'insertNewPublication';

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
    const request = axios.get(`${ROOT_URL}/authors`);
    return{
        type: FETCH_ALL_AUTHORS,
        payload: request
        
    }
}

export function createBook(values, callback){

    const request = axios.post(`${ROOT_URL}/book`, values).then(()=> callback() );
    return {
        type: CREATE_BOOK,
        payload:request
    }
}

export function fetchBook(id){
    const request = axios.get(`${ROOT_URL}/getBookWithId?bookId=${id}`);
    return{
        type: FETCH_BOOK,
        payload: request
    }

}


export function updateBook(values, callback){
     console.log(values)
 
   // const  obj = { book_id, book_name, description, price, yop, author_id, publication_id, category_id, thumb_url } = { values }
   const updatedBook = {
    book_id: values.book_id,
    book_name: values.book_name,
    description: values.description,
    price: values.price,    
    yop: values.yop, 
    author_id: values.author_id,
    publication_id: values.publication_id,
    category_id: values.category_id, 
    thumb_url: values.thumb_url
   }
   updatedBook.yop = "2017"; 
   var body = new FormData();
   Object.keys(updatedBook).forEach(( key ) => {               
       if(key=='thumb_url'){                 
           body.append(key, values[ key ][0]);
       }else{
           body.append(key, values[ key ]);
       }
   
   });
   console.info('POST', body);
 
    const request = axios.put(`${ROOT_URL}/book`, body).then(()=> callback() );
    return {
        type: UPDATE_BOOK,
        payload:request
    }
}

export function deletePublication(id, callback){
    axios.delete(`${ROOT_URL}/publication?publication_id=${id}`).then(()=>callback());
    return{
        type: DELETE_PUBLICATION,
        payload: id
    }
}

export function deleteCategory(id, callback){
    axios.delete(`${ROOT_URL}/category?category_id=${id}`).then(()=>callback());
    return{
        type:DELETE_CATEGORY,
        payload:id
    }
}

export function deleteAuthor(id, callback){
    axios.delete(`${ROOT_URL}/author?author_id=${id}`).then(()=>callback());
    return{
        type:DELETE_AUTHOR,
        payload:id
    }
}

export function updateAuthor(author,callback){
    if(author.author_id != 0){
        const request = axios.put(`${ROOT_URL}/author`, author).then(()=> callback() );
        return {
            type: UPDATE_AUTHOR,
            payload:request
        }
    }else if(author.author_id == 0){
        const request = axios.post(`${ROOT_URL}/author`, [
            {
              "author_name": author.author_name
            }
          ]).then(()=> callback() );
        return {
            type: INSERT_AUTHOR,
            payload:request
        }
    }
    
}

export function updateCategory(category,callback){
    if(category.category_id==0){
        const request = axios.post(`${ROOT_URL}/category`, category).then(()=> callback() );
        return {
            type: INSERT_CATEGORY,
            payload:request
        }
    }else{
        const request = axios.put(`${ROOT_URL}/category`, category).then(()=> callback() );
        return {
            type: UPDATE_CATEGORY,
            payload:request
        }
    }
  
}

export function updatePublication(publication,callback){
    if(publication.publication_id == 0){
        const request = axios.post(`${ROOT_URL}/publication`, publication).then(()=> callback() );
        return {
            type: INSERT_PUBLICATION,
            payload:request
        }
    }
    const request = axios.put(`${ROOT_URL}/publication`, publication).then(()=> callback() );
    return {
        type: UPDATE_PUBLICATION,
        payload:request
    }
}

export function addAuthor(){
    return {
        type:ADD_AUTHOR
    }
}
export function addCategory(){
    return {
        type:ADD_CATEGORY
    }
}
export function addPublication(){
    return {
        type:ADD_PUBLICATION
    }
}