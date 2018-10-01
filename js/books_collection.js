//declarations
var booksLibrary,allAuthorsInfo, allPublishersInfo=[];

//Json object for books
booksLibrary=[
    {
        "title": "Frankestein",
        "author": "Marry Shelly",
        "publisher": "London Pubishers",
        "publishingDate": "1908-04-05"
    },

    {
        "title": "Harry Potter",
        "author": "J. K. Rowling",
        "publisher": "Bloomsbury Publishing",
        "publishingDate": "1997-06-26"
    },

    {
        "title": "Learning Python",
        "author": "Mark Lutz",
        "publisher": "Oreilly",
        "publishingDate": "2013-01-04"
    },

    {
        "title": "Cracking the Coding Interview",
        "author": "Gayle McDowell",
        "publisher": "Career Cup",
        "publishingDate": "2015-06-03"
    },

    {
        "title": "Cracking the Tech Career, Second Edition",
        "author": "Gayle McDowell",
        "publisher": "Career Cup",
        "publishingDate": "2016-01-26"
    },

    {
        "title": "Dracula",
        "author": "Bram Stoker",
        "publisher": "Constible & Robinson",
        "publishingDate": "1897-04-05"
    }
]

const setLocalStorage=(name, data)=>{
    localStorage.setItem(name, JSON.stringify(data));
}

const getItemFromLocalStorage =(name)=>{
    return JSON.parse(localStorage.getItem(name));
}

try {
    if(!getItemFromLocalStorage('booksLib')){
        setLocalStorage('booksLib', booksLibrary); 
    } 
    if(!getItemFromLocalStorage('authorsInfo')){
        setLocalStorage('authorsInfo',allAuthorsInfo);
    } 
    if(!getItemFromLocalStorage('publishersInfo')){
        setLocalStorage('publishersInfo', allPublishersInfo);
    }
    
} catch (e) {
    alert('Local Storage not available');
}
 
