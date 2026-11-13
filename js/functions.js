function changeMainColor(colorName){
    let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);

    html.style.setProperty('--main-color', newColor)
}

function updateWebLogo(logoName) {
    let currentSrc = webLogo.href,
    currentSrcArr = currentSrc.split('/');
    currentSrcArr[currentSrcArr.length - 1] = `${logoName}-logo.png`;
    let newSrc = currentSrcArr.join('/');

    webLogo.setAttribute('href', newSrc);
}

function next(){
    let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
        newSlide = currentSlide.nextElementSibling ?? scCarousel.querySelector(".sc-carousel-item:first-child"),
        currentName = newSlide.dataset.colorName;

        currentSlide.classList.remove("active");
        newSlide.classList.add("active");

        changeMainColor(currentName);
        updateImg(currentName, logoEle, 'logo');

                correctImgs.forEach(function(correctImgs){
                    updateImg(currentName, correctImgs, 'correct');
                });


        updateWebLogo(currentName);
}
function prev(){
    let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
     newSlide = currentSlide.previousElementSibling ?? scCarousel.querySelector(".sc-carousel-item:last-child"),
     currentName = newSlide.dataset.colorName;

     currentSlide.classList.remove("active");
        newSlide.classList.add("active");
        changeMainColor(currentName);
        updateImg(currentName, logoEle, 'logo');

                correctImgs.forEach(function(correctImgs){
                    updateImg(currentName, correctImgs, 'correct');
                });


        updateWebLogo(currentName);

}
function updateImg(imgName, imgEle, commonName) {
    let currentSrc = imgEle.src,
    currentSrcArr = currentSrc.split('/');

    currentSrcArr[currentSrcArr.length - 1] = `${imgName}-${commonName}.png`;
    let newSrc = currentSrcArr.join('/');

    imgEle.setAttribute('src', newSrc);
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

function prepareImagesList(imagesList,  isProduct = false){
    let liElements = "";

   imagesList.forEach(function(image){
    liElements += `<li class="${(isProduct)? 'mx-2': 'mainBorder p-2'}"><img src="./images/products/${image}" onclick="changeSelectedImg('${image}', this);" class="img-fluid" alt=""></li>`;
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

function prepareSizesList(sizesList,isProductIntoCart = null){
    let liElements = "";

   sizesList.forEach(function(size, index){
    if(isProductIntoCart == null){
        liElements += `<li class="mainButton rounded-2 ${(index == 0) ? 'active': ''}" onclick="changeActive(this); updateSize('${size}', this);">${size}</li>`;
    }else{
        liElements += `<li class="mainButton rounded-2 ${(isProductIntoCart.size == size) ? 'active': ''}" onclick="changeActive(this); updateSize('${size}', this);">${size}</li>`;
    }
   });
   return liElements;
}

function prepareColorList(colorList, isProductIntoCart = null){
    let liElements = "";
   colorList.forEach(function(color, index){
    if(isProductIntoCart == null){
        liElements += `<li class="mainButton rounded-circle ${(index == 0) ? 'active': ''}" onclick="changeActive(this); updateColor('${color}', this);" style="background-color: ${color};"></li>`;
    }else{
        liElements += `<li class="mainButton rounded-circle ${(isProductIntoCart.color == color) ? 'active': ''}" onclick="changeActive(this); updateColor('${color}', this);" style="background-color: ${color};"></li>`;
    }
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

function getProduct(productId){
    return products.filter(product => product.id == productId)[0];
}
function showProduct(productId){
    let product = getProduct(productId),
    popUpProduct = document.querySelector(`.popup[data-popup-name="product"] .box`);
    let isProductIntoCart = checkProductIntoCart(product.id);


    popUpProduct.innerHTML = ` <div class="row product"
   data-selected-size="${isProductIntoCart?.size ?? product.sizes[0]}"
    data-selected-color="${isProductIntoCart?.color ?? product.colors[0]}"
    >
                <div class="col-lg-6">
                    <div class="item">
                        <div class="selectedImg">
                            <img src="./images/products/${product.images[0]}" alt="" class="img-fluid">
                        </div>
                        <ul class="d-flex list-unstyled">
                            ${prepareImagesList(product.images, true)}
                        </ul>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="item">
                        <h4>${product.name}</h4>
                        ${preparePrice(product.price, product.discount)}
                        <hr>
                        <p>${product.description}</p>
                        <div class="size d-flex">
                            <div class="label me-3">
                                <h6 class="fw-bolder">Size :</h6>
                            </div>
                            <div class="value">
                                <ul class="list-unstyled d-flex column-gap-2">
                                    ${prepareSizesList(product.sizes, isProductIntoCart)}
                                </ul>
                            </div>
                        </div>
                        <div class="color d-flex">
                            <div class="label me-3">
                                <h6 class="fw-bolder">Color :</h6>
                            </div>
                            <div class="value">
                                <ul class="list-unstyled d-flex column-gap-2">
                                    ${prepareColorList(product.colors, isProductIntoCart)}
                                </ul>
                            </div>
                        </div>
                        ${
                    (isProductIntoCart == null)?
                    `<button class="btn mainButton rounded-2 py-2 px-3" onclick="addToCart(${product.id}, this)">Add To Cart</button>`
                    :
                    `<button class="btn mainButton remove rounded-2 py-2 px-3" onclick="removeFromCart(${product.id}, this)">Remove From Cart</button>`
                        }
                    </div>
                </div>
            </div>
    `;
    openPopup('product');
}

function addToCart(productId, that){
    let productEle = that.closest('.product'),
    newOder = {
        id: productId,
        size: productEle.dataset.selectedSize,
        color: productEle.dataset.selectedColor,
    };
    cartProducts.push(newOder);
    updateLocalStorage();
    toggleOrderBtn(that, 'remove');
    that.setAttribute('onclick', `removeFromCart(${productId}, this)`);
}

function removeFromCart(productId, that){
    cartProducts = cartProducts.filter((product) => product.id != productId);
    updateLocalStorage();
    
    if(that != null){
        toggleOrderBtn(that, 'add');
    that.setAttribute('onclick', `addToCart(${productId}, this)`);
    }

}

function toggleOrderBtn(btn, status){
    if(status == 'add'){
        btn.classList.remove('remove');
        btn.textContent = "Add To Cart";
    }else if(status == 'remove'){
        btn.classList.add('remove');
        btn.textContent = "Remove From Cart";
    }
}

function updateSize(size, that){
    let productEle = that.closest('.product');

    productEle.dataset.selectedSize = size;
}
function updateColor(color, that){
    let productEle = that.closest('.product');

    productEle.dataset.selectedColor = color;
}

function updateLocalStorage(){
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}
function checkProductIntoCart(productId){
    let result = cartProducts.filter((product) => product.id == productId);
    return result.length == 1? result[0] : null ;
}

function showCart(){

    let contentEle = document.querySelector(`.popup[data-popup-name="shop"] .row`);

    if(cartProducts.length == 0){
        contentEle.innerHTML = `<p class="alert alert-warning text-center">There are no products</p>`;
    }else{
        contentEle.innerHTML = "";
    
        cartProducts.forEach(function(cartProduct){
            let product = getProduct(cartProduct.id);
            contentEle.innerHTML += `
            <div class="col-lg-4 py-3">
                <div class="item">
                    <div class="product bg-body p-3 rounded-3" data-product-id="${product.id}">
                        <img src="./images/products/${product.images[0]}" alt="" class="img-fluid">
                        <h5>${product.name.slice(0, 10)}...</h5>
                        <div class="price d-flex">
                            <div class="label me-3">
                                <h6 class="fw-bolder">Price :</h6>
                            </div>
                            <div class="value">
                                ${preparePrice(product.price, product.discount)}
                            </div>
                        </div>
                        <div class="size d-flex">
                                <div class="label me-3">
                                    <h6 class="fw-bolder">Size :</h6>
                                </div>
                                <div class="value">
                                    <ul class="list-unstyled d-flex column-gap-2">
                                        ${prepareSizesList([cartProduct.size])}
                                    </ul>
                                </div>
                            </div>
                            <div class="color d-flex">
                                <div class="label me-3">
                                    <h6 class="fw-bolder">Color :</h6>
                                </div>
                                <div class="value">
                                    <ul class="list-unstyled d-flex column-gap-2">
                                        ${prepareColorList([cartProduct.color])}
                                    </ul>
                                </div>
                            </div>
                        <button class="btn btn-danger w-100 mt-3" onclick="removeFromShop(${product.id})">Remove</button>
                    </div>
                </div>
            </div>
            `;
        });
    
    }
    
    openPopup('shop');
}

function removeFromShop(productId){
    let productEle = document.querySelector(`.popup[data-popup-name="shop"] .row .product[data-product-id="${productId}"]`);
    productEle.parentElement.parentElement.remove();

    let buttonOfLatestProduct = document.querySelector(`#Latest .product[data-product-id="${productId}"] button`);
    removeFromCart(productId, buttonOfLatestProduct);

    if(cartProducts.length == 0){
    let contentEle = document.querySelector(`.popup[data-popup-name="shop"] .row`);
    
    contentEle.innerHTML = `<p class="alert alert-warning text-center">There are no products</p>`;
}
}



