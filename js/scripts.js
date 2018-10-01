//Declarartions
const booknameField= document.getElementById("bookName");
const authorField= document.getElementById("author");
const publisherField= document.getElementById("publisher");
const dateField= document.getElementById("date");
const table= document.getElementById("books_table");
const new_book_div=document.querySelector(".new_book_div");
var authorsInfo, publishersInfo;
var editFlag=false;
var authorName,publisherName='';

//function to populate table
const populateTable = (books_data) => {

    //clear table 
    while(table.rows.length>1){    
        table.deleteRow(table.rows.length-1);   
    }

    let book_count= 0;
    //loop over each object in booksLibrary array object
    for(let book of books_data){
        
        book_count++;
        //make new row for each book
        const row= table.insertRow(-1);
        
        //add id for the book in first cell
        const  rowCellOne= row.insertCell(0);
         rowCellOne.innerHTML= book_count;

        //loop over every property
        for(let bookProperty of Object.values(book)){
            
            //make new cell for each property and insert data
            let  rowCell= row.insertCell(-1);
             rowCell.innerHTML =  bookProperty;

        }

        //delete button
        const deleteButton= document.createElement('input');
        deleteButton.type="button";
        deleteButton.value= "Delete";
        deleteButton.style.margin="5px";
        deleteButton.style.background=" #F39D41";
        //Edit button
        const editButton= document.createElement('input');
        editButton.type="button";
        editButton.value= "Edit";
        editButton.style.margin="5px";
        editButton.style.background="#F39D41";

        //add action buttons in the last cell of each row
        const rowCellLast= row.insertCell(-1);
        rowCellLast.append(deleteButton);
        rowCellLast.append(editButton);    
    }
}

//populate authors collection
const populateAuthorsArray= ()=>{
    //empty authorsInfo/publishersInfo
    let temp_authorsInfo=[];
    
    for(let book of booksLib){ 
        const author_exists=temp_authorsInfo.some(author=>book.author==author.authorName);
        
        if(!author_exists){
            temp_authorsInfo.push({authorName: book.author, numberOfBooks: 1 });
        }
        else{
            for(let author of temp_authorsInfo){
                if(author.authorName==book.author){
                    author.numberOfBooks =  author.numberOfBooks + 1;
                    break;
                }
            }
        }
    }
    return temp_authorsInfo;
    
}

//populate publishers collection
const populatePublishersArray= ()=>{
    //empty authorsInfo/publishersInfo
    let temp_publishersInfo=[];
    for(let book of booksLib){
        let publisher_exists=temp_publishersInfo.some(publisher=>book.publisher==publisher.publisherName);
        
        if(!publisher_exists){
            temp_publishersInfo.push({publisherName: book.publisher, numberOfBooks: 1 });
        }

        else{
            for(let publisher of temp_publishersInfo){
                if(publisher.publisherName==book.publisher){
                    publisher.numberOfBooks =  publisher.numberOfBooks + 1;
                    break;
                }
            }
        }
    }
    return temp_publishersInfo;
}

//get book title to specify the index of object at which the book info is placed
const getBookTitle= function(elementRef){
    return elementRef.target.parentNode.parentNode.cells[1].textContent;
}


//delete book function
const deleteBook= (bookTitle)=>{
    
    //find index of object containing the book title
    const index= booksLib.findIndex(
        (book)=>{
            //save author name of the book
            publisherName= book.publisher;
            authorName= book.author;
            return book.title==bookTitle;    
        }
    );

    booksLib.splice(index,1);
    return booksLib;
} 


//delete entry from authorsInfo collection
const deleteBookFromAuthorsCollection=(nameOfAuthor)=>{
    authorsInfo= getItemFromLocalStorage('authorsInfo');
    
    for(let author in authorsInfo){
        console.log(author.authorName);
        if(author.authorName==nameOfAuthor){
            if(author.numberOfBooks==1)
                return authorsInfo.splice(index,1);
            //else
            author.numberOfBooks--
            return authorsInfo;
        }
    }
}

//delete entry from publishersInfo collection
const deleteBookFromPublishersCollection=(nameOfPublisher)=>{
    publishersInfo= getItemFromLocalStorage('publishersInfo');
    
    for(let publisher in publishersInfo){
        if(publisher.publisherName==nameOfPublisher){
            if(publisher.numberOfBooks==1)
                return publishersInfo.splice(index,1);
            //else
            publisher.numberOfBooks--
            return publishersInfo;
        }
    }
}

//add new book function
const addBook= ()=>{
    if(booknameField.value=='' || authorField.value=='' || publisherField.value=='' || dateField.value==''){
        alert("Please fill all fields to add a new book");
        return false;
    }

    //validation for already existing book 
    for(let book of booksLib){
        if(book.title == booknameField.value){
            alert("Book already exists in the record!");
            return false;
        }

    }

    booksLib.push({"title": booknameField.value, "author": authorField.value, "publisher": publisherField.value, "publishingDate":dateField.value});
    return true;
    
}

//clear fields
const clear_fields= ()=>{
    booknameField.value="";
    authorField.value="";
    publisherField.value="";
    dateField.value="";
}

//Show edit fields in the table row
const showEditFields= (rowReference) =>{
    //get current selected row
    const currentRow=rowReference.target.parentNode.parentNode;

    //display editable fields in each table cell of the current row
    for(let i =1; i<currentRow.cells.length-2; i++){ 
        //editable textfield
        const edit_field= document.createElement('input');
        edit_field.type="text";
        edit_field.value= currentRow.cells[i].textContent;
        currentRow.cells[i].textContent="";
        //add new field in the cell
        currentRow.cells[i].append(edit_field);
    }

    //add date type input field
    //date field
    const edit_date_field= document.createElement('input');
    edit_date_field.type="date";
    edit_date_field.value= currentRow.cells[currentRow.cells.length-2].textContent;
    //remove the already present text from cells
    currentRow.cells[currentRow.cells.length-2].textContent="";
    //add new field in the cell
    currentRow.cells[currentRow.cells.length-2].append(edit_date_field);
}

//Edit book func
const editBookInfo= (bookTitle, rowReference)=>{
    //find index of object containing the book title
    const index= booksLib.findIndex(
        (book)=>{
             return book.title==bookTitle;    
        }
    );
    const currentRow=rowReference.target.parentNode.parentNode;
    // save values from the text fields
    const bookName= currentRow.cells[1].getElementsByTagName('input')[0].value;
    const authorName= currentRow.cells[2].getElementsByTagName('input')[0].value;
    const publisherName= currentRow.cells[3].getElementsByTagName('input')[0].value;
    const date= currentRow.cells[4].getElementsByTagName('input')[0].value;
    
    if(bookName=='' || authorName=='' || publisherName=='' || date==''){
        alert("Please fill all fields to edit a book");
        return false;
    }

    
    //validation for already existing book 
    let tempIndex=-1;
    for(let book of booksLib){
        tempIndex++;
        if(book.title == bookName && index!=tempIndex){
            alert("Book already exists in the record!");
            return false;
        }

    }

    //delete specific book's record and add new record
    booksLib.splice(index,1,
        {"title": bookName, 
        "author": authorName, 
        "publisher": publisherName, 
        "publishingDate":date});
    return true;
}

//runner
//click listerners for buttons
document.addEventListener("click", function(e){
    //Delete Book
    if(e.target.value=="Delete"){
        //get book title to be deleted
        //delete book from the booksLib
        booksLib=deleteBook(getBookTitle(e));
        setLocalStorage('booksLib', booksLib);

        authorsInfo=deleteBookFromAuthorsCollection(authorName);
        setLocalStorage('authorsInfo',authorsInfo);

        publishersInfo=deleteBookFromPublishersCollection(publisherName);
        setLocalStorage('publishersInfo',publishersInfo);
        
        populateTable(booksLib);
        authorsInfo=populateAuthorsArray();
        publishersInfo=populatePublishersArray();
        setLocalStorage('authorsInfo',authorsInfo);
        setLocalStorage('publishersInfo',publishersInfo);
    }
    
    //Edit Book
    else if(e.target.value=="Edit"){
        if(!editFlag){
            editFlag=true;
            e.target.value="Done";
            selectedBookTitle= getBookTitle(e);
            showEditFields(e);
        }
    }

    else if(e.target.value=="Done"){
        editFlag=false;
        if(editBookInfo(selectedBookTitle, e)){
            e.target.value="Edit";
            setLocalStorage('booksLib',booksLib);
            populateTable(booksLib);
            authorsInfo=populateAuthorsArray();
            publishersInfo=populatePublishersArray();
            setLocalStorage('authorsInfo',authorsInfo);
            setLocalStorage('publishersInfo',publishersInfo);
        }

    }
    
    //Add new book
    else if(e.target.value=="Add New Book"){
        new_book_div.style.display='block';
    }
    
    //Submit new book
    else if(e.target.value=="Submit"){
        try{
            if(addBook()){
                //add book in the book_library
                setLocalStorage('booksLib',booksLib); 
                populateTable(booksLib);
                authorsInfo=populateAuthorsArray();
                publishersInfo=populatePublishersArray();
                setLocalStorage('authorsInfo',authorsInfo);
                setLocalStorage('publishersInfo',publishersInfo);
            }
        }
        catch(e){
            alert("Failed to Read Local Storage. Local Storage Not Available")
        }
        clear_fields();
        new_book_div.style.display='none';
    }
    
    //Cancel adding new book
    else if(e.target.value=="Cancel"){
        clear_fields();
        new_book_div.style.display='none';
        
    }
});



var booksLib= getItemFromLocalStorage('booksLib');
populateTable(booksLib);
authorsInfo=populateAuthorsArray();
publishersInfo=populatePublishersArray();
setLocalStorage('authorsInfo',authorsInfo);
setLocalStorage('publishersInfo',publishersInfo);

