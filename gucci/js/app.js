let btns = document.getElementsByClassName('btn-buy');


for(var i = 0; i < btns.length; i++){
    btns[i].addEventListener("click", function(){
        let image = this.parentNode.children[0].src;
        let filename = image.split('/');
        let name = this.parentNode.children[1].innerHTML;
        let category = this.parentNode.children[2].innerHTML;
        let price = this.parentNode.children[3].innerHTML;
        window.location = `shop.html?name=${name}&category=${category}&price=${price}&image=${filename[filename.length-1]}`;
    });
}
