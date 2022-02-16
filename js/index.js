

  function sliderAnime() {
    anime({
      targets: ".Slider-title",
      rotate: [{ value: -45 }, { value: 0 }],
      translateY: [{ value: -100 }, { value: 0 }],
      translateX: [{ value: -50 }, { value: 0 }],
      opacity: [{ value: 0 }, { value: 1 }],
      duration: 1500,
      loop: 1,
    });

    anime({
      targets: ".Slider-heading",
      translateX: [{ value: 100 }, { value: 0 }],
      opacity: [{ value: 0 }, { value: 1 }],
      duration: 2000,
      loop: 1,
    });

    anime({
      targets: ".Head_section .btn-shop",

      translateY: [{ value: 200 }, { value: 0 }],

      translateX: [{ value: -100 }, { value: 0 }],

      rotate: [
        { value: 0, delay: 100 },
        { value: 360, duration: 1600 },
      ],
      opacity: [{ value: 0 }, { value: 1 }],
      duration: 2200,
    });
  }
  sliderAnime();

  $(window).on("load",()=>{
    $("#Preload").fadeOut(1000)
  })


  document.querySelector(".Eye").addEventListener("click",(e)=>{
    let type= document.querySelector(".PasswordInput").getAttribute("type");
    type==="password"? type="text":type="password";
    document.querySelector(".PasswordInput").setAttribute("type",type);
    e.target.classList.value.includes("fa-eye-slash")?  e.target.classList.remove("fa-eye-slash"): e.target.classList.add("fa-eye-slash");
  })
  $(".closeForm").click(()=>{
    $(".signUpForm").removeClass("show");
    $(".shadow").removeClass("active");
  });

  $(".signupbtn").click(()=>{
    document.querySelector(".shadow").classList.add("active");
    $(".shadow").addClass("active");
    $(".signUpForm").addClass("show");
  })


$(".Shopping-cart").click(function(){
  $(".ShopCart-Container").css("transform","translateX(0)");
  $(".shadow").addClass("active");
  $(document.body).css("overflow-y","hidden")
});
$(".closeCart").click(function(){
  $(".ShopCart-Container").css("transform","translateX(100%)");
  $(".shadow").removeClass("active");
  $(document.body).css("overflow-y","auto")
});
$(".shadow").click(function(){
  $(".ShopCart-Container").css("transform","translateX(100%)");
  $(".shadow").removeClass("active");
  $(".sidebar").removeClass("active");
  $(".signUpForm").removeClass("show");
  $(document.body).css("overflow-y","auto")
});

$(".overview-buttons li").click(function () {
  if ($(this).hasClass("triangle")) {
    $(this).find("i").removeClass("fa-times");
    $(this).removeClass("triangle");
  } else {
    $(".overview-buttons li").removeClass("triangle");
    $(".overview-buttons li").find("i").removeClass("fa-times");
    $(this).find("i").addClass("fa-times");
    $(this).addClass("triangle");
  }
});

$("#filterbtn").click(function () {
  $(".filter-modal").slideToggle(1000);
  $(".filter-search").slideUp(100);
});
$("#searchbtn").click(function () {
  $(".filter-search").slideToggle(400);
  $(".filter-modal").slideUp();
});

$(".sub-filters:first-of-type li").click(function () {
  $(".sub-filters:first-of-type li").find("a").preventDefault();
  $(".sub-filters:first-of-type li").removeClass("activeSort");
  $(this).addClass("activeSort");
});

$(".hamburgerBtn").click(function(){
  $(".sidebar").addClass("active");
  $(".shadow").addClass("active");
  $(document.body).css("overflow-y","hidden")
});

$(".closeSidebar").click(function(){
  $(".sidebar").removeClass("active");
  $(".shadow").removeClass("active");
  $(document.body).css("overflow-y","auto")
});

$(window).on("scroll", () => {
  if (window.scrollY > 20) {
    $("header").addClass("bg-white");
  } else {
    $("header").removeClass("bg-white");
  }
});
let HeaderSilder=document.querySelector(".Head_section");
let products = document.querySelector(".products");
let modal = document.querySelector(".product-modal-inner");
let cartContainer=document.querySelector(".carts-container")
let increase = 1;
const getProducts = async () => {
  let data = await fetch("products.json").then((a) => a.json());

if(HeaderSilder){
  
  data.HeaderSliders.map(item=>{
    HeaderSilder.innerHTML+=`<div class="slider-item">
    <div class="wrapper slider-text">
      <h2 class="Slider-title one">${item.STitle}</h2>
      <h1 class="Slider-heading">${item.Sheading}</h1>
      <a href="#" class="btn-shop">SHOP NOW</a>
    </div>
    <img src=${item.ImgSrc} alt="">
  </div>`
  });
}

  $(".Head_section").owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeOut: 10000,
    smartSpeed: 500,
    animateOut: "fadeOut",
    margin: 50,
  });

  $(".owl-carousel").on("changed.owl.carousel", function (event) {
    sliderAnime();
  });
    data.products.map((product) => {
    let productBox = document.createElement("div");
    productBox.classList.add("product-box");
    productBox.setAttribute("id", product.id);
    productBox.setAttribute("category", product.Category);
    productBox.setAttribute("data-aos", "fade-up");
    productBox.setAttribute("data-aos-delay", `${increase * 100}`);
    increase++;
    increase > 4 ? (increase = 1) : increase;
    let title =
      product.Title.length > 35
        ? product.Title.slice(0, 35) + "..."
        : product.Title;
  
    productBox.innerHTML = `
    <div class="p-box-image">
      <img src="${product.PosterImg}" alt="">
      <button class="quickOverview">View Details</button>
      <ul class="options">
        <li class="heart"><i class="far fa-heart"></i></li>
        <li class="Pcart"><i class="fas fa-shopping-cart"></i></li>
        <li><i class="fas fa-search-plus"></i></li>
      </ul>
    </div>`;
    let pboxText = document.createElement("a");
    pboxText.setAttribute("href",`detail.html?category=${product.Category}&id=${product.id}`);
    pboxText.classList.add("p-box-text");
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.innerText = title;
    let pStars = document.createElement("span");
    pStars.classList.add("stars");
    for (let j = 0; j < 5; j++) {
      let Starfigure = document.createElement("i");
      Starfigure.classList.add("fa-star");
      Starfigure.classList.add(j < product.stars ? "fas" : "far");
      pStars.append(Starfigure);
    }
    pboxText.append(productTitle, pStars);
    pboxText.innerHTML += `
    <ul class="product-prices flex align-center">
    <li>$${product.MainPrice}</li>
    <li>$${product.FromPrice}</li>
  </ul>`;
    productBox.append(pboxText);
    if(products){
      products.append(productBox);
    }
  });

  let basket=[];
  $(".Pcart").click(function(e){
    $(this).find("i").toggleClass("green");
    let clikId=e.target.closest(".product-box").getAttribute("id");
    let check=basket.find(a=>a==clikId)
    if(!check){
      basket.push(clikId);
    }
    else{
      basket=basket.filter(a=>a!=clikId);
    }
    writeBasket();
  });

  const writeBasket=()=>{
    cartContainer.innerHTML="";
    let total=0;
    let counter=basket.length;
    basket.map(item=>{
     let found=data.products.find(a=>a.id==item);
      let cartItem=document.createElement("div");
      cartItem.classList.add("cart-item","flex");
      cartItem.setAttribute("cart-id",found.id);
      let title=found.Title.length>35? found.Title.slice(0,35)+"...":found.Title;
      cartItem.innerHTML=` <img src=${found.PosterImg} alt="">
      <div class="cart-item-text ml-10">
          <a href="#">${title}</a>
          <p>$${found.MainPrice}</p>
      </div>
      <button class="clearCart"><i class="fas fa-trash-alt"></i></button>`;
      cartContainer.append(cartItem);
      total+=item? +found.MainPrice:0;
    });

    let Countspan=document.createElement("span");
    Countspan.classList.add("counter");

    if(!basket.length){
      cartContainer.innerHTML="<h3>Your cart is empty</h3>";
      Countspan.innerText=0;
      document.querySelector(".Shopping-cart").append(Countspan)
    }
    else{
     
      Countspan.innerText=counter;
      document.querySelector(".Shopping-cart").append(Countspan)
    }
      document.querySelector(".total").innerText=`Total: $${total}`
    $(".clearCart").click(function(e){
      let clearedID=e.target.closest(".cart-item").getAttribute("cart-id");
      basket=basket.filter(id=>id!=clearedID);
      writeBasket();
      [...document.querySelectorAll(".product-box")].map(product=>{
        if(product.getAttribute("id")==clearedID){
          product.querySelector(".Pcart i").classList.remove("green")
        }
      });
      if(document.querySelector(".Product-details")&&document.querySelector(".Product-details .productImg").getAttribute("id")==clearedID){
        
          document.querySelector(".Product-details .btn-add").innerText="ADD TO CART"
        
      }
    });
  };


  $(".quickOverview").click((e) => {
    modal.innerHTML = "";
    $(".product-modal").fadeIn();
    $(".shadow").addClass("active");
    $(document.body).css("overflow-y","hidden")

    let clickedID = $(e.target).closest(".product-box").attr("id");

    WriteModal(clickedID);
  });

  const WriteModal = (clickID) => {
    modal.innerHTML =
      '<span class="closeModal"><i class="fas fa-times"></i></span>';
    let ClickedElement = data.products.find((product) => product.id == clickID);

    let productImg = document.createElement("div");
    productImg.classList.add("productImg", "swiper");
    productImg.setAttribute("id",ClickedElement.id);
    let ProductSwiperWrapper = document.createElement("div");
    ProductSwiperWrapper.classList.add("swiper-wrapper");

    for (let i = 0; i < ClickedElement.imagesOfPr.length; i++) {
      let SlideItem = document.createElement("div");
      SlideItem.classList.add("swiper-slide");
      let img = document.createElement("img");
      img.setAttribute("src", ClickedElement.imagesOfPr[i]);
      SlideItem.append(img);
      ProductSwiperWrapper.append(SlideItem);
    }

    let Nextbtn = document.createElement("div");
    Nextbtn.classList.add("swiper-button-next");
    let Prevbtn = document.createElement("div");
    Prevbtn.classList.add("swiper-button-prev");
    productImg.append(ProductSwiperWrapper, Prevbtn, Nextbtn);

    let ProductsOtherImg = document.createElement("div");
    ProductsOtherImg.classList.add("ProductsOtherImg", "swiper");
    let POtherImgSwrapper = document.createElement("div");
    POtherImgSwrapper.classList.add("swiper-wrapper");
    for (let i = 0; i < ClickedElement.imagesOfPr.length; i++) {
      let OtherSlideItem = document.createElement("div");
      OtherSlideItem.classList.add("swiper-slide");
      let Pimg = document.createElement("img");
      Pimg.setAttribute("src", ClickedElement.imagesOfPr[i]);
      OtherSlideItem.append(Pimg);
      POtherImgSwrapper.append(OtherSlideItem);
    }
    ProductsOtherImg.append(POtherImgSwrapper);

    modal.append(ProductsOtherImg, productImg);

    let swiper = new Swiper(ProductsOtherImg, {
      direction: "vertical",
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    let Mainswiper = new Swiper(productImg, {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });

    let productText = document.createElement("div");
    productText.classList.add("product-texts");
    productText.innerHTML = `<a href='detail.html?category=${ClickedElement.Category}&id=${ClickedElement.id}'><h3 class="productDetailTitle">${ClickedElement.Title}</h3></a>`;

    let Reviews = document.createElement("div");
    Reviews.classList.add("reviews");
    let stars = document.createElement("span");
    stars.classList.add("stars");
    for (let j = 0; j < 5; j++) {
      let Starfigure = document.createElement("i");
      Starfigure.classList.add("fa-star");
      Starfigure.classList.add(j < ClickedElement.stars ? "fas" : "far");
      stars.append(Starfigure);
    }
    Reviews.append(stars);
    Reviews.innerHTML += `<span class="ml-10">  ${ClickedElement.stars}.0 &nbsp; | &nbsp;  ${ClickedElement.comments} reviews</span>`;

    let PricesUL = document.createElement("ul");
    PricesUL.classList.add("product-prices", "flex", "align-center");
    PricesUL.innerHTML = ` <p class="priceWord"> Price: </p>
  <li>$${ClickedElement.MainPrice}</li>
  <li>$${ClickedElement.FromPrice}</li> `;
    let sizeDiv = document.createElement("div");
    sizeDiv.classList.add("size", "mt-30");
    let sizeUL = document.createElement("ul");
    sizeUL.classList.add("ProductSizes", "flex");
    let activeSize = document.createElement("h3");
    ClickedElement.sizes.map((measure, i) => {
      let li = document.createElement("li");
      li.innerText = measure;
      i == 0 ? li.classList.add("activeSize") : true;
      i == 0 ? (activeSize.innerText = "Size : " + measure) : true;

      sizeUL.append(li);

      li.addEventListener("click", () => {
        document.querySelector(".activeSize").classList.remove("activeSize");
        li.classList.add("activeSize");
        activeSize.innerText = "";
        activeSize.innerText = "Size : " + li.innerText;
        sizeDiv.prepend(activeSize);
      });
    });

    sizeDiv.append(activeSize, sizeUL);

    let modalbuttons = document.createElement("div");
    modalbuttons.classList.add("flex", "align-center", "mt-20");

    let btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-add");
    let clickProduct=document.querySelector(".productImg").getAttribute("id");
    let find=basket.find(a=>a==clickProduct);
    btnAdd.innerText = find? "Added":"ADD TO CART";
    btnAdd.addEventListener("click", (e) => {
      if (e.target.innerText == "Added") {
        e.target.innerText = "ADD TO CART";
        basket=basket.filter(a=>a!=clickProduct);
        [...document.querySelectorAll(".product-box")].map(product=>{
          if(product.getAttribute("id")==clickProduct){
            product.querySelector(".Pcart i").classList.remove("green")
          }
        })
      } else {
        e.target.innerText = "Added";
        basket.push(clickProduct);
      }
      writeBasket();
    });
    let heartdetail = document.createElement("span");
    heartdetail.classList.add("heartdetail");
    heartdetail.innerHTML = `<i class="far fa-heart"></i>`;
    heartdetail.addEventListener("click", (e) => {
      heartdetail.querySelector("i").classList.toggle("fas");
    });

    modalbuttons.append(btnAdd, heartdetail);

    productText.append(Reviews, PricesUL, sizeDiv, modalbuttons);

    modal.append(productText);

    $(".closeModal").click(function () {
      $(".product-modal").fadeOut();
      $(".shadow").removeClass("active");
      $(document.body).css("overflow-y","auto")
    });
  };
let ProductDetails=document.querySelector(".Product-details");
  if(ProductDetails){
    let link = new URL(window.location.href);
    let id = Number(link.searchParams.get("id"));
    let Category = link.searchParams.get("category");

      let ClickedElement = data.products.find((product) => product.id ==id);
      let title =
      ClickedElement.Title.length >20
        ? ClickedElement.Title.slice(0, 20) + "..."
        : ClickedElement.Title;
      let NavUl=document.createElement("ul");
      NavUl.classList.add("nav-list");
        NavUl.innerHTML=`
        <li><a href="index.html">Home</a></li>
        <li><a href="category.html?Category=${ClickedElement.Category}">${Category}</a></li>
        <li >${title}</li>`;
        ProductDetails.append(NavUl);
  
      let productImg = document.createElement("div");
      productImg.classList.add("productImg", "swiper");
      productImg.setAttribute("id",ClickedElement.id);
      let ProductSwiperWrapper = document.createElement("div");
      ProductSwiperWrapper.classList.add("swiper-wrapper");
  
      for (let i = 0; i < ClickedElement.imagesOfPr.length; i++) {
        let SlideItem = document.createElement("div");
        SlideItem.classList.add("swiper-slide");
        let img = document.createElement("img");
        img.setAttribute("src", ClickedElement.imagesOfPr[i]);
        SlideItem.append(img);
        ProductSwiperWrapper.append(SlideItem);
      }
  
      let Nextbtn = document.createElement("div");
      Nextbtn.classList.add("swiper-button-next");
      let Prevbtn = document.createElement("div");
      Prevbtn.classList.add("swiper-button-prev");
      productImg.append(ProductSwiperWrapper, Prevbtn, Nextbtn);
  
      let ProductsOtherImg = document.createElement("div");
      ProductsOtherImg.classList.add("ProductsOtherImg", "swiper");
      let POtherImgSwrapper = document.createElement("div");
      POtherImgSwrapper.classList.add("swiper-wrapper");
      for (let i = 0; i < ClickedElement.imagesOfPr.length; i++) {
        let OtherSlideItem = document.createElement("div");
        OtherSlideItem.classList.add("swiper-slide");
        let Pimg = document.createElement("img");
        Pimg.setAttribute("src", ClickedElement.imagesOfPr[i]);
        OtherSlideItem.append(Pimg);
        POtherImgSwrapper.append(OtherSlideItem);
      }
      ProductsOtherImg.style.width="80px "
      ProductsOtherImg.append(POtherImgSwrapper);
  
      ProductDetails.append(ProductsOtherImg, productImg);
  
      let swiper = new Swiper(ProductsOtherImg, {
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      let Mainswiper = new Swiper(productImg, {
        loop: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
  
      let productText = document.createElement("div");
      productText.classList.add("product-texts");
      productText.innerHTML = `<h3 class="productDetailTitle">${ClickedElement.Title}<h3>`;
  
      let Reviews = document.createElement("div");
      Reviews.classList.add("reviews");
      let stars = document.createElement("span");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        let Starfigure = document.createElement("i");
        Starfigure.classList.add("fa-star");
        Starfigure.classList.add(j < ClickedElement.stars ? "fas" : "far");
        stars.append(Starfigure);
      }
      Reviews.append(stars);
      Reviews.innerHTML += `<span class="ml-10">  ${ClickedElement.stars}.0 &nbsp; | &nbsp;  ${ClickedElement.comments} reviews</span>`;
  
      let PricesUL = document.createElement("ul");
      PricesUL.classList.add("product-prices", "flex", "align-center");
      PricesUL.innerHTML = ` <p class="priceWord"> Price: </p>
    <li>$${ClickedElement.MainPrice}</li>
    <li>$${ClickedElement.FromPrice}</li> `;


      let detailsUL=document.createElement("ul");
      detailsUL.classList.add("detailsUL","mt-20");
      detailsUL.innerHTML="<h3>Product's Details:</h3>"
      ClickedElement.details.map(detail=>{
        let li=document.createElement("li");
        li.innerText=detail;
        detailsUL.append(li);
      })
      let sizeDiv = document.createElement("div");
      sizeDiv.classList.add("size","mt-30");
      let sizeUL = document.createElement("ul");
      sizeUL.classList.add("ProductSizes", "flex");
      let activeSize = document.createElement("h3");
      ClickedElement.sizes.map((measure, i) => {
        let li = document.createElement("li");
        li.innerText = measure;
        i == 0 ? li.classList.add("activeSize") : true;
        i == 0 ? (activeSize.innerText = "Size : " + measure) : true;
  
        sizeUL.append(li);
  
        li.addEventListener("click", () => {
          document.querySelector(".activeSize").classList.remove("activeSize");
          li.classList.add("activeSize");
          activeSize.innerText = "";
          activeSize.innerText = "Size : " + li.innerText;
          sizeDiv.prepend(activeSize);
        });
      });
  
      sizeDiv.append(activeSize, sizeUL);
  
      let modalbuttons = document.createElement("div");
      modalbuttons.classList.add("flex", "align-center", "mt-20");
  
      let btnAdd = document.createElement("button");
      btnAdd.classList.add("btn-add");
      let clickProduct=document.querySelector(".productImg").getAttribute("id");
      let find=basket.find(a=>a==clickProduct);
      btnAdd.innerText = find? "Added":"ADD TO CART";
      btnAdd.addEventListener("click", (e) => {
        if (e.target.innerText == "Added") {
          e.target.innerText = "ADD TO CART";
          basket=basket.filter(a=>a!=clickProduct);
          [...document.querySelectorAll(".product-box")].map(product=>{
            if(product.getAttribute("id")==clickProduct){
              product.querySelector(".Pcart i").classList.remove("green")
            }
          })
        } else {
          e.target.innerText = "Added";
          basket.push(clickProduct);
        }
        writeBasket();
      });
      let heartdetail = document.createElement("span");
      heartdetail.classList.add("heartdetail");
      heartdetail.innerHTML = `<i class="far fa-heart"></i>`;
      heartdetail.addEventListener("click", (e) => {
        heartdetail.querySelector("i").classList.toggle("fas");
      });
  
      modalbuttons.append(btnAdd, heartdetail);
  
      productText.append(Reviews, PricesUL,sizeDiv,modalbuttons, detailsUL );
  
      ProductDetails.append(productText);


      for(let i=0;i<ClickedElement.comments;i++){
        document.querySelector(".Comments").innerHTML+=`
        <div class="person">
        <h3>John Smith 
          <span class="reviews ml-24"> 
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
              <i class="far fa-star"></i>
          </> 
       </h3>
       <p class="time color-g">09 July, 2021</p>
       <p class="color-g comment">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       </p>
      </div>`
      }
      $(".ReviewBtn").html(`Reviews (${ClickedElement.comments})`)
      $(".ReviewBtn").click(function(){
        $(".Description").slideUp();
        $(".Comments").slideDown();
        $(".red-stick").addClass("active");
      })
      $(".Descriptionbtn").click(function(){
        $(".Description").slideDown();
        $(".Comments").slideUp();
        $(".red-stick").removeClass("active");
      })
  
  }

  AOS.init({
    offset: 200,
    duration: 600,
  });

  if(document.querySelector(".slider-item")){
    gsap.from(".slider-item img", 1, { x: 400, opacity: 0 });
  }

  $(".overview-links li").click(function () {
    $(".overview-links li").removeClass("hov-active");
    $(this).addClass("hov-active");
    [...document.querySelectorAll(".product-box")].map((product) => {
      product.classList.add("d-none");
      if (product.getAttribute("category") == $(this).text()) {
        product.classList.remove("d-none");
        product.removeAttribute("data-aos");
        product.removeAttribute("data-aos-delay");
      }
      if ($(this).text() == "All Products") {
        product.classList.remove("d-none");
        product.setAttribute("data-aos", "zoom-in-up");
        product.setAttribute("data-aos-delay", `${increase * 100}`);
      }
    });
  });


};

getProducts();
