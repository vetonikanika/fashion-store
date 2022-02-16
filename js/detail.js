
const getDetails=async()=>{
  let relatedSlider=document.querySelector(".relatedSlider");
  let link = new URL(window.location.href);
  let id = Number(link.searchParams.get("id"));
  let Category = link.searchParams.get("category");
  let data = await fetch("products.json").then((a) => a.json());
   data.products.map((product) => {
    if(product.Category==Category&&product.id!=id){
      let productBox = document.createElement("div");
    productBox.classList.add("product-box");
    productBox.setAttribute("id", product.id);
    productBox.setAttribute("category", product.Category);
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
    relatedSlider.append(productBox);
    }
  });


  
  $(relatedSlider).owlCarousel({
    items: 4,
    nav: true,
    dots: false,
    smartSpeed: 500,
    autoplay:true,
    margin: 30,
    responsive : {
 
      320 : {
        items : 1,
    },  
         // breakpoint from 768 up
    768 : {
      items : 2,
  }, 
    1024 : {
      items : 3,
  },
    1440 : {
      items : 4,
  }
  }
  });


let categoriesProducts=document.querySelector(".category-products")
  if(categoriesProducts){

    let link = new URL(window.location.href);
  let Category = link.searchParams.get("Category");
  let NavUl=document.createElement("ul");
      NavUl.classList.add("nav-list");
        NavUl.innerHTML=`
        <li><a href="index.html">Home</a></li>
        <li><a href="category.html?Category=${Category}">Shop</a></li>`
        document.querySelector(".ShopCategories").append(NavUl);
               
        [...document.querySelectorAll(".sub-categoriesUL li")].map(list=>{
          if(list.getAttribute("category")==Category){
            list.classList.add("active");
          }
        });

        [...document.querySelectorAll(".category-Prices li")].map(list=>{
          list.getAttribute("min")=="Default"&&
          list.classList.add("active");

          list.addEventListener("click",()=>{
            document.querySelector(".category-Prices .active").classList.remove("active");
            list.classList.add("active");
            [...document.querySelectorAll(".category-products .product-box")].map(product=>{
              product.classList.add("d-none");
              let element=product.querySelector(".product-prices li:first-of-type")
      
              if(list.getAttribute("max")){
                if (+element.innerText.replace('$','')>=list.getAttribute("min")&&+element.innerText.replace('$','')<=list.getAttribute("max")) {
                  product.classList.remove("d-none");
                }
              }
              else{ 
                if (+element.innerText.replace('$','')>=list.getAttribute("min")) {
                  product.classList.remove("d-none");
              }
              else if(list.getAttribute("min")=="Default"){
                product.classList.remove("d-none");
              }
            }
            })
          })
        });
        [...document.querySelectorAll(".category-sizes li")].map(list=>{

          list.addEventListener("click",()=>{
            document.querySelector(".category-sizes .active")&&
            document.querySelector(".category-sizes .active").classList.remove("active");
            list.classList.add("active");
          })
        });
        $(".CategoryBtn").click(function(){
          $(this).toggleClass("active")
          $(this).next(".sub-categories").slideToggle(500);
          $(this).next(".category-sizes").css("display","flex");
        })
        

  data.products.map(product=>{
    const createProduct=()=>{
      let productBox = document.createElement("div");
      productBox.classList.add("product-box");
      productBox.setAttribute("id", product.id);
      productBox.setAttribute("category", product.Category);
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
      categoriesProducts.append(productBox);
    }
    if(Category=="All Products"){
      createProduct();
    }
   else if(Category==product.Category){
     createProduct();
    }
   
  })



  document.querySelector(".sub-categoriesUL li:first-of-type").innerText=`All products (${data.products.length})`;
  document.querySelector(".sub-categoriesUL li:nth-of-type(2)").innerText=`Men (${data.products.filter(a=>a.Category=="Men").length})`;
  document.querySelector(".sub-categoriesUL li:nth-of-type(3)").innerText=`Women (${data.products.filter(a=>a.Category=="Women").length})`;
  document.querySelector(".sub-categoriesUL li:nth-of-type(4)").innerText=`Bags (${data.products.filter(a=>a.Category=="Bag").length})`;
  document.querySelector(".sub-categoriesUL li:nth-of-type(5)").innerText=`Shoes (${data.products.filter(a=>a.Category=="Shoes").length})`;
  document.querySelector(".sub-categoriesUL li:last-of-type").innerText=`Watches (${data.products.filter(a=>a.Category=="Watches").length})`;

    [...document.querySelectorAll(".sub-categoriesUL li")].map(List=>{
      List.addEventListener("click",(e)=>{
        
        document.querySelector(".sub-categoriesUL .active").classList.remove("active");
        List.classList.add("active");
        categoriesProducts.innerHTML="";
        document.querySelector(".category-Prices .active").classList.remove("active");
        [...document.querySelectorAll(".category-Prices li")].map(list=>{
          list.getAttribute("min")=="Default"&&
          list.classList.add("active");
        });
        Category=List.getAttribute("category");
        window.location.href=window.location.href.split("=")[0]+`=${Category}`;      
      })
    })
  }
  let blogSlider=document.querySelector(".blog-slider");
  if(blogSlider){
    $(blogSlider).slick({
      centerMode: true,
      centerPadding: '60px',
      centerMargin:"20px",
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 500,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 769,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
  }
}

getDetails();

