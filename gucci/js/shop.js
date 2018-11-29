let imageHolder = "";

function getParam(name){  
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
    var regexS = "[\\?&]"+name+"=([^&#]*)";  
    var regex = new RegExp( regexS );  
    var results = regex.exec(window.location.href);
    if(results == null)
        return "";  
    else    
        return results[1];
}

function getData(){
    let info = document.getElementById('shop-info');
    info.children[0].src = `./images/${getParam('image')}`;
    info.children[1].innerHTML = getParam('name').replace(/%20/g, ' ');
    info.children[2].innerHTML = getParam('category').replace(/%20/g, ' ');
    imageHolder = getParam('image');
}

let btn = document.getElementById('buy');

btn.addEventListener('click', function(){
    let inputs = document.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++){
        if(!inputs[i].value){
            error(inputs);
            return false;
        }
    }
    success(inputs);
});

function error(inputs){
    for(var i = 0; i < inputs.length; i++){
        inputs[i].style = 'border: 1px solid red';
    }
    alert('Please fill all fields');
}

function success(inputs){
    let labels = document.getElementsByTagName('label');
    let shopOutput = document.getElementById('shop-output');
    let shopList = document.getElementById('shop-info-list');
    let str = "";
    for(var i = 0; i < inputs.length; i++){
        str += `<p>${labels[i].innerHTML} ${inputs[i].value}</p>`;
    }
    
    shopOutput.children[1].children[0].src = `./images/${imageHolder}`;
    shopList.innerHTML = str;
    shopOutput.style = 'display:block';
    
}