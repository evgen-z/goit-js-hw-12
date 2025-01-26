import{a as f,i as u,S as F}from"./assets/vendor-Dpd1z_xS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&m(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const h=(t,e)=>{const s=new URLSearchParams({key:"529440-adfab00ac2bbbc69c0a669d95",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:"15"});return f.get(`https://pixabay.com/api/?${s}`)};function p(t){return t.map(e=>`
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
      `).join("")}const y=document.querySelector(".search-form"),l=document.querySelector(".gallery"),n=document.querySelector(".loader"),a=document.querySelector(".load-more-button");let d,i=1;n.style.display="none";a.style.display="none";const b=async t=>{try{t.preventDefault();const e=t.currentTarget.elements.query.value.trim();if(l.innerHTML="",e===""){u.warning({title:"Warning",message:"Search field cannot be empty!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",titleColor:"#FAFAFB",iconColor:"#FAFAFB"});return}n.style.display="block";const{data:s}=await h(e,i);if(s.total===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"}),l.innerHTML="",n.style.display="none",y.reset();return}l.innerHTML=p(s.hits),a.style.display="block",d?d.refresh():d=new F(".gallery a"),n.style.display="none"}catch(e){console.log(e)}};y.addEventListener("submit",b);const g=async()=>{const t=y.elements.query.value.trim();try{i++;const{data:e}=await h(t,i);if(i*15>=e.totalHits){u.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#EF4040",messageColor:"#FAFAFB",iconColor:"#FAFAFB"}),a.style.display="none",a.removeEventListener("click",g);return}l.insertAdjacentHTML("beforeend",p(e.hits)),L()}catch(e){console.log(e)}};a.addEventListener("click",g);const L=()=>{const{height:t}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})};
//# sourceMappingURL=index.js.map
