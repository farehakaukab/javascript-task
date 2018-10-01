const table= document.getElementById("authors_table");
var booksLib= getItemFromLocalStorage('booksLib');
var authorsInfo= getItemFromLocalStorage('authorsInfo');

//display data in the data
const populateTable=(authorsData)=>{
    //clear table 
    while(table.rows.length>1){    
        table.deleteRow(table.rows.length-1);   
    }

    for(let authors of authorsData){
        const row= table.insertRow(-1);
        let cell='';
        for(let author_info of Object.values(authors)){
            cell= row.insertCell(-1);
            cell.innerHTML=author_info;
        }
        //last actions cell
        cell= row.insertCell(-1);
        
        //delete button
        const deleteButton= document.createElement('input');
        deleteButton.type="button";
        deleteButton.value= "Delete";
        deleteButton.style.margin="5px";
        deleteButton.style.background=" #F39D41";

        cell.append(deleteButton);
    }
        

}

//delete author from authors collection
const deleteAuthor=(authorname)=>{
    //find index of object containing the author name
    const index= authorsInfo.findIndex(
        (author)=>{
            return author.authorName==authorname;    
        }
    );
    authorsInfo.splice(index,1);
    return authorsInfo;
    
}

//delete books of the author
const deleteBooksOfAuthor=(authorName)=>{
    for(let book of booksLib){
        const index= booksLib.findIndex(
            (book)=>{
                 return book.author==authorName;    
            }
        );
        if(index!=-1){
            booksLib.splice(index,1);
        }
            
    }
    return booksLib;
}

//get author name for specifying the index of object at which it's info is placed
const getAuthorName= (elementRef)=>{
    return elementRef.target.parentNode.parentNode.cells[0].textContent;
}

document.addEventListener("click", function(e){
    //Delete author
    if(e.target.value=="Delete"){
        publishersInfo=deleteAuthor(getAuthorName(e));
        setLocalStorage('authorsInfo',authorsInfo );
        
        booksLib=deleteBooksOfAuthor(getAuthorName(e));
        setLocalStorage('booksLib',booksLib);
        
        populateTable(authorsInfo);
    }
});


populateTable(authorsInfo);