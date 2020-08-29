

var productName=document.getElementById("productNameInp");
var productPrice=document.getElementById("productPriceInp");
var productCategroy=document.getElementById("productCategroyInp");
var productDes=document.getElementById("productDesInp");
var addButton=document.getElementById("addButton");

var inps=document.getElementsByClassName("form-control");

var showInpUpdate=document.getElementById("showUpdate")

var alertNameprod=document.getElementById("alert_nameShow");


var container;



if(localStorage.getItem("productData")==null){
    container=[];
}
else{
   container= JSON.parse(localStorage.getItem("productData")) ;
    displayproduct();


}


addButton.onclick=function (){
   
    if(productCategroy.value==""||productDes.value=="" ||productPrice.value==""|| productName.value==""){
       
        alert("you should complit the data inpute")
    }
        else{
           
            addproduct();
            displayproduct();
            clearinpute();
        }
    
   
    

        
}




function addproduct(){

    var product={
        name:productName.value,
        price:productPrice.value,
        categroy:productCategroy.value,
        des:productDes.value
    }
    container.push(product);
    localStorage.setItem("productData",JSON.stringify(container));
    

}
function clearinpute(){
    for(var i=0;i<inps.length;i++){
        inps[i].value="";
    }



}

function displayproduct(){

    var productdisplay="";

    for(var i=0;i<container.length;i++){
        productdisplay+=`
        <div class="col-md-3 ">
        <div class="product">
           <img  class="img-fluid"   src="images/productimg.jpg">
           <h3 >`+container[i].name+` <span class="badge badge-primary ml-3 ">`+container[i].categroy+`</span> </h3>
           <p id="description">`+container[i].des+`</p>
           
           <div class="price">`+container[i].price+`</div>
           </div>
           
        <button onclick="deleteproduct(`+i+`)" class="btn btn-outline-danger btn-sm">delete</button>
        <button  onclick="updataproduct(`+i+`)" class="btn btn-outline-warning btn-sm">update</button>
         </div>`
    }

    document.getElementById("productrow").innerHTML=productdisplay;

}

function searchproduct(term){
var productdisplay="";
for(var i=0;i<container.length;i++){
 if(container[i].name.toLowerCase().includes((term).toLowerCase())){
     
    productdisplay+=`
    <div class="col-md-3  ">
    <div class="product  ">
       <img  class="img-fluid"   src="images/productimg.jpg">
       <h3 >`+container[i].name+` <span class="badge badge-primary ml-3 ">`+container[i].categroy+`</span> </h3>
       <p id="description">`+container[i].des+`</p>
       
       <div class="price">`+container[i].price+`</div>
       </div>
       <button onclick="deleteproduct(`+i+`)" class="btn btn-outline-danger btn-sm">delete</button>
       <button onclick="updataproduct(`+i+`)" id="updatebtn" class="btn btn-outline-warning btn-sm">update</button>
     </div>`
 }
 document.getElementById("productrow").innerHTML=productdisplay;

}

}
function deleteproduct(index){
container.splice(index,1);
localStorage.setItem("productData",JSON.stringify(container));
displayproduct()
}




function updataproduct(index){
   
     productName.value  =container[index].name;
     productPrice.value=container[index].price;
     productCategroy.value=container[index].categroy;
     productDes.value=container[index].des
     var temp="";
     temp+=` <button id="submitUpdate" onclick= "submitupdate(`+index+`)" class="btn btn-danger" >submit update </button>`;
      document.getElementById("showUpdate").innerHTML=temp;
 
      showInpUpdate.style.display="block"
      

}




function submitupdate(index){
    if(productCategroy.value==""||productDes.value=="" ||productPrice.value==""|| productName.value==""){
       
        alert("you should complit the data inpute")
    }
    else{
    productName=document.getElementById("productNameInp");
    productPrice=document.getElementById("productPriceInp");
    productCategroy=document.getElementById("productCategroyInp");
    productDes=document.getElementById("productDesInp");
    container[index].name=productName.value;
    container[index].price=productPrice.value;
    container[index].categroy=productCategroy.value;
    container[index].des=productDes.value;
    localStorage.setItem("productData",JSON.stringify(container));
    displayproduct();
    clearinpute();
    
}
}
   



function disablebtnUpdate(){
    showInpUpdate.style.display="none"

}






 productName.addEventListener("keyup",function(){

    var rejxName=/^[A-Z][a-z]{3,15}$/;
    
    
    if(rejxName.test(productName.value)==true){
           productName.classList.add("is-valid");
           productName.classList.remove("is-invalid");
           addButton.removeAttribute("disabled")
           alertNameprod.style.display="none"
          
    }
    else{

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        addButton.disabled=true;
        alertNameprod.style.display="block";
    }

    
 })

 productPrice.addEventListener("keyup",function(){

    var alertpriceprod=document.getElementById("alert_priceShow")
    
    
    var rejxPrice=/^[0-9]{1,10}$/;


    
    
    if(rejxPrice.test(productPrice.value)==true){
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
            addButton.removeAttribute("disabled")
           alertpriceprod.style.display="none"
          
    }
    else{

        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        addButton.disabled=true;
        alertpriceprod.style.display="block";
    }


 });

 //this for hidden place holder from input when focus and return seen if dont focus

 (function (){
 'user strict'
 for(var i=0;i<inps.length;i++){
     inps[i].onfocus=function(){
         //this for store the placeholder in attribute data-place
         this.setAttribute('data-place',this.getAttribute('placeholder'));
           //this forempty the placeholder 
         this.setAttribute('placeholder','');


     }
     inps[i].onblur=function(){
         //return the placeholder from data-place attribute 
        this.setAttribute('placeholder',this.getAttribute('data-place'));
        //this for empty the data-place
        this.setAttribute('data-place','');


    }
 }

}())







//  max lenght text area
 var count=document.getElementById('count');
 var maxLenght= productDes.getAttribute("maxlength")

 productDes.oninput=function(){
    count.innerHTML=maxLenght - this.value.length;
if(count.innerHTML==0){
    count.style.color="red"
}
else{
    count.style.color="blue"
}

}


