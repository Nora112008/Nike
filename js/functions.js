function changeMainColor(colorName){
    let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);

    html.style.setProperty('--main-color', newColor)
}

function updateImg(imgName, imgEle, commonName) {
    let currentSrc = imgEle.src,
    currentSrcArr = currentSrc.split('/');

    currentSrcArr[currentSrcArr.length - 1] = `${imgName}-${commonName}.png`;
    let newSrc = currentSrcArr.join('/');

    imgEle.setAttribute('src', newSrc);
}

function updateLogo(logoName) {
    let currentSrc = webLogo.href,
    currentSrcArr = currentSrc.split('/');
    currentSrcArr[currentSrcArr.length - 1] = `${logoName}-logo.png`;
    let newSrc = currentSrcArr.join('/');

    webLogo.setAttribute('href', newSrc);
}

function checkScrolledNav(){
    if(window.scrollY > 10){
        navEle.classList.add("scrolled");
    }else{
        navEle.classList.remove("scrolled");
    }
}

// Another Way to update nav links
/*
function updateNavLink(sectionId){
    let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionHeight = section.clientHeight,
    sectionBottom = sectionTop + sectionHeight;

    if(window.scrollY > sectionTop && window.scrollY < sectionBottom ){
        let sectionId = section.getAttribute('id'),
        navLinkOfSection = document.querySelector(`a[href="#${sectionId}"]`),
        currentNavLink = navEle.querySelector(".nav-link.active");

        currentNavLink.classList.remove("active");
        navLinkOfSection.classList.add("active");

    }
}
*/

function prepareImagesList(imagesList){
    let liElements = "";

   imagesList.forEach(function(image){
    liElements += `<li class="mainBorder p-2" style="cursor: pointer;"><img src="./images/products/${image}" onclick="changeSelectedImg('${image}', this);" class="img-fluid" alt=""></li>`;
   });
   return liElements;
}

function preparePrice(price, discount){
    return `
    <p class="mb-0">
        <span class="text-decoration-line-through mainColor ${(discount == 0 )? 'd-none' : '' }">${price} <sup>$</sup></span>
        <span>${(price * (1 - discount)).toFixed(2)} <sup>$</sup></span>
    </p>
    `;
}

function prepareSizesList(sizesList){
    let liElements = "";

   sizesList.forEach(function(size, index){
    liElements += `<li class="mainButton rounded-2 ${(index == 0) ? 'active': ''}" onclick="changeActive(this);" style="cursor: pointer;">${size}</li>`;
   });
   return liElements;
}

function prepareLiList(imagesList){
     let liElements = "";

   imagesList.forEach(function(image, index){
    liElements += `<li class="mainButton rounded-circle ${(index == 0) ? 'active': ''}" onclick="changeSelectedImg('${image}', this); changeActive(this);"></li>`;
   });
   return liElements;
}

function changeSelectedImg(imgName, that){
    let selectedImg = that.closest('.product').querySelector('.selectedImg img'),
    srcArr = selectedImg.src.split("/");

    srcArr[srcArr.length - 1] = imgName;
    selectedImg.setAttribute('src', srcArr.join('/'));

}

function changeActive(that){
    let currentActive = that.parentElement.querySelector('.active');

    currentActive.classList.remove("active");
    that.classList.add("active");
}

function openPopup(popupName){
    let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);

    popupEle.classList.add('active');

    setTimeout(function(){
        popupEle.classList.add('show');
    },1);
}

function closePopup(){
    let popupEle = document.querySelector(`.popup.active`);

    popupEle.classList.remove('show');
    
    setTimeout(function(){
        popupEle.classList.remove('active');
    },1000);

}
