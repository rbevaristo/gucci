function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function getData() {
    let info = document.getElementById('shop-info');
    info.children[0].src = `./images/${getParam('image')}`;
    info.children[1].innerHTML = getParam('name').replace(/%20/g, ' ');
    info.children[2].innerHTML = getParam('category').replace(/%20/g, ' ');
    info.children[3].innerHTML = getParam('price').replace(/%20/g, ' ');
}

let btn = document.getElementById('buy');

btn.addEventListener('click', function() {
    let inputs = document.getElementsByTagName('input');
    let selectSize = document.getElementById('size');
    let isComplete = true;
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            isComplete = false;
        }
    }
    if (isComplete == true) {
        success(inputs, selectSize);
    } else {
        error(inputs, 'Please fill all fields');
    }
});

function error(inputs, message) {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].style = 'border: 1px solid red';
    }
    document.getElementById('shop-output').style = 'display:none';
    alert(message);
}

function success(inputs, selectSize) {
    let labels = document.getElementsByClassName('label');
    let shopOutput = document.getElementById('shop-output');
    let shopList = document.getElementById('shop-info-list');
    let str = `<p>Product Name: ${getParam('name').replace(/%20/g, ' ')}</p>
               <p>Product Category: ${getParam('category').replace(/%20/g, ' ')}</p>
               <p>Product Price: ${getParam('price').replace(/%20/g, ' ')}</p>
    `;
    let change = calculateChange(inputs[inputs.length - 1].value);
    console.log(change);
    for (var i = 0; i < inputs.length; i++) {
        if (i == 1)
            str += `<p>Size: ${selectSize.value}</p>`;
        if (i == inputs.length - 1) {
            str += `<p>${labels[i].innerHTML} P${inputs[i].value}.00</p>`;
            continue;
        }
        str += `<p>${labels[i].innerHTML} ${inputs[i].value}</p>`;
    }
    if (change < 0) {
        error(inputs, 'Invalid amount!');
        return false;
    }
    str += `<p>Change: P${change}.00</p>`;
    shopOutput.children[1].children[0].src = `./images/${getParam('image')}`;
    shopList.innerHTML = str;
    shopOutput.style = 'display:block';

}

function calculateChange(amount) {
    let price = parseInt(getParam('price').replace(/%20/g, ' ').split(' ')[1]);
    return (total = amount - price) >= 0 ? total : '';
}