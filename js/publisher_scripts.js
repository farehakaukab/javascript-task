const table= document.getElementById("publishers_table");
var booksLib= getItemFromLocalStorage('booksLib');
var publishersInfo= getItemFromLocalStorage('publishersInfo');

//populate data in the table
const populateTable=(publishers_data)=>{
    
    //clear table 
    while(table.rows.length>1){    
        table.deleteRow(table.rows.length-1);   
    }

    for(let publisher of publishers_data){
        const row= table.insertRow(-1);
        let cell='';
        for(let publisher_info of Object.values(publisher)){
            cell= row.insertCell(-1);
            cell.innerHTML=publisher_info;
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

//delete publisher from publishers collection
const deletePublisher=(publishername)=>{
    //find index of object containing the author name
    let index= publishersInfo.findIndex(
        (publishers)=>{
            return publishers.publisherName==publishername;    
        }
    );
    publishersInfo.splice(index,1);
    return publishersInfo;
}

//delete corresponding books of that publisher
const deleteBooksOfPublisher=(publisherName)=>{
    for(let book of booksLib){
        
        let index= booksLib.findIndex(
            (book)=>{
                 return book.publisher==publisherName;    
            }
        );
        if(index!=-1){
            booksLib.splice(index,1);   
        }    
    }
    return booksLib;
}

//get publisher name whose info is to be deleted to find index of the object at which the info is placed
const getPublisherName= (elementRef)=>{
    return elementRef.target.parentNode.parentNode.cells[0].textContent;
}

document.addEventListener("click", function(e){
    //Delete author
    if(e.target.value=="Delete"){
        publishersInfo= deletePublisher(getPublisherName(e));
        setLocalStorage('publishersInfo',publishersInfo);
        
        booksLib=deleteBooksOfPublisher(getPublisherName(e));
        setLocalStorage('booksLib',booksLib);
        
        populateTable(publishersInfo);
    }
});


populateTable(publishersInfo);