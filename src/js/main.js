//get access to these 3 container which will store the elements
const toDoItems = document.getElementsByClassName ("to-do-items")[0];
const input = document.getElementById("input");
const trashIcon = document.getElementById("trash");

// to be able to enter the value (task) via enter key 
input.addEventListener("keydown", function(event){
  if (event.key === "Enter")
  addItem();        // calling the function addItem 
})

//create the addItem function --> the box where we add tasks
function addItem(){
  let divParent = document.createElement("div");  // div for the whole box
  let divChild = document.createElement("div");  // div to store the icons 
  let checkIcon = document.createElement("i");
  let trashIcon = document.createElement("i");
  let editIcon = document.createElement("i");

  divParent.className = "item";
  divParent.innerHTML = "<div>"+input.value+"</div>"; //create annother div for input av the value of task

  //creating icons 
  checkIcon.className = "bi bi-check2-circle";
  checkIcon.style.color = "lightgrey";
  checkIcon.addEventListener("click", function(){
    checkIcon.style.color = "limegreen"
  })
  checkIcon.addEventListener("dblclick",function(){
    checkIcon.style.color = "lightgrey";
  })

  divChild.appendChild(checkIcon);   //added the icon to the divchild 

  editIcon.className = "bi bi-pen-fill";
  editIcon.style.color = "#77ccff";
  checkIcon.addEventListener("click", function(){
    editIcon.contentEditable
  })

  divChild.appendChild(editIcon);
  



  trashIcon.className = "bi bi-trash";
  trashIcon.style.color = "darkgrey";
  trashIcon.addEventListener("click", function(){
    divParent.remove();
  })

  divChild.appendChild(trashIcon);  //add this to the divChild
  
  divParent.appendChild(divChild); // add this to the divParent -->divParent has the divChild that includes the icons and value 
  
  toDoItems.appendChild(divParent);  // add divParent to the whole container 

  input.value = " ";  // this clear the input box after adding the first task

}



