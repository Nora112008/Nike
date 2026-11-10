let scCarousel = document.querySelector("#SC-Carousel"),
nextCarousel = scCarousel.querySelector(".next"),
prevCarousel = scCarousel.querySelector(".prev"),
webLogo = document.querySelector("link[rel='icon']"),
logoEle = document.querySelector("#Logo"),
correctImgs = document.querySelectorAll(".title img"),
navEle = document.querySelector("nav.navbar"),
navLinks = navEle.querySelectorAll(".nav-link"),
sections = document.querySelectorAll("section, header"),
loadingPageEle = document.querySelector(".loadingPage"),
latestContainer = document.querySelector("#Latest .content"),
featuredContainer = document.querySelector("#Featured .content .row"),
popupBoxes = document.querySelectorAll(".popup .box");


checkScrolledNav();


nextCarousel.addEventListener("click", function(){
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


        updateLogo(currentName);
});
prevCarousel.addEventListener("click", function(){
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


        updateLogo(currentName);

});


document.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight"){
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


        updateLogo(currentName);
    }else if (e.key === "ArrowLeft"){
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


        updateLogo(currentName);
    }
})



window.addEventListener("scroll", function () {
    checkScrolledNav();

     navLinks.forEach(function (navLink) {

        let currentId = navLink.getAttribute("href"),
            currentSection = document.querySelector(currentId),
            sectionTop = currentSection.offsetTop - navEle.clientHeight,
            sectionBottom = sectionTop + currentSection.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {

            navEle.querySelector(".nav-link.active")?.classList.remove("active");

            navLink.classList.add("active");
        }

    });


     /*
     sections.forEach(function(section){
        updateNavLink(section.id);

     })
        */
});

navLinks.forEach(function(navLink){
    navLink.addEventListener("click", function (e) {
        e.preventDefault();
        let currentNavLink = navEle.querySelector(".nav-link.active"),
        currentId =  navLink.getAttribute("href"),
        currentSection = document.querySelector(currentId),
        sectionTop = currentSection.offsetTop - navEle.clientHeight;

        currentNavLink.classList.remove("active");
        navLink.classList.add("active");

        window.scrollTo( 0, sectionTop );
        
    });
});

window.addEventListener("DOMContentLoaded", function(){
    loadingPageEle.classList.add("hide");

    setTimeout(function(){
        loadingPageEle.classList.add("d-none")
    },1000)
});

latest.forEach(function(product){
    latestContainer.innerHTML += `
    <div class="product mainBorder bg-body rounded-3 p-3 mb-3">
    <div class="row">
        <div class="col-lg-6 part1">
            <div class="item">
                <div class="row">
                    <div class="col-lg-2 box1">
                        <div class="item">
                            <ul class="list-unstyled d-flex flex-row flex-lg-column column-gap-3 row-gap-lg-2 column-gap-lg-3">
                                ${prepareImagesList(product.images)}
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-10 box2">
                        <div class="item">
                            <div class="selectedImg">
                                <img src="./images/products/${product.images[0]}" class="img-fluid" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 part2">
            <div class="item">
                <h2 class="mainColor">${product.name}</h2>
                <p class="text-secondary">${product.description}</p>
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
                        ${prepareSizesList(product.sizes)}
                    </ul>
                    </div>
                </div>
                <button class="btn mainButton rounded-2 py-2 px-3">Add To Cart</button>
            </div>
        </div>
    </div>
</div>
    `;
});

features.forEach(function(product){
    featuredContainer.innerHTML += `
     <div class="col-lg-3">
        <div class="item">
    <div class="product text-center bg-body rounded-3 px-3 py-1">
        <p class="discount ${(product.discount == 0) ? 'd-none' : '' } ">-${product.discount * 100}</p>
        <div class="head">
            <div class="selectedImg">
                <img src="./images/products/${product.images[0]}" class="img-fluid" alt="">
            </div>
            <i class="fa-solid fa-magnifying-glass"></i>
            <ul class="list-unstyled d-flex  justify-content-center column-gap-2">
                ${prepareLiList(product.images)}
            </ul>
        </div>
        <div class="body mb-3">
            <h5 class="fw-normal fs-6">${product.name}</h5>
            ${preparePrice(product.price, product.discount)}
        </div>
    </div>
        </div>
    </div>
    `;
});

popupBoxes.forEach(function(box){
    box.addEventListener('click', function(e){
        e.stopPropagation();
    });
});

