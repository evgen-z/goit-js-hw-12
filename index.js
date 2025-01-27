import{a as F,i as y,S as b}from"./assets/vendor-Dpd1z_xS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&p(u)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();const h=(r,e)=>{const d=new URLSearchParams({key:"529440-adfab00ac2bbbc69c0a669d95",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:"85"});return F.get(`https://pixabay.com/api/?${d}`)};function f(r){return r.map(e=>`
        <a class="gallery-link" href="${e.largeImageURL}">
        <div class="gallery-under">
		<img 
			class="gallery-image" 
			src="${e.webformatURL}" 
			alt="${e.tags}" 
			/>
            <ul class="gallery-info">
        <li class="gallery-info-item">
          <h3>Likes</h3>
          <p>${e.likes}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Views</h3>
          <p>${e.views}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Comments</h3>
          <p>${e.comments}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Downloads</h3>
          <p>${e.downloads}</p>
        </li>
      </ul></div>
	</a>
      `).join("")}const g=document.querySelector(".search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".loader"),s=document.querySelector(".load-more-button");let n,a=1,c="";i.style.display="none";s.style.display="none";const L=async r=>{try{if(r.preventDefault(),c=r.currentTarget.elements.query.value.trim(),l.innerHTML="",a=1,c===""){y.warning({title:"Warning",message:"Search field cannot be empty!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",titleColor:"#FAFAFB",iconColor:"#FAFAFB"});return}i.style.display="block",s.style.display="none";const{data:e}=await h(c,a);if(e.total===0){y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"}),l.innerHTML="",i.style.display="none",s.style.display="none",g.reset();return}e.totalHits>15&&(s.style.display="block",s.addEventListener("click",m)),l.innerHTML=f(e.hits),n?n.refresh():n=new b(".gallery a"),i.style.display="none"}catch(e){console.log(e)}};g.addEventListener("submit",L);const m=async()=>{try{a++;const{data:r}=await h(c,a);if(l.insertAdjacentHTML("beforeend",f(r.hits)),n.refresh(),A(),a*85>=r.totalHits){y.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"}),s.style.display="none",s.removeEventListener("click",m);return}}catch(r){console.log(r)}},A=()=>{const{height:r}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})};
//# sourceMappingURL=index.js.map
