export function renderGallery(images) {
  return images
    .map(
      img => `
        <a class="gallery-link" href="${img.largeImageURL}">
        <div class="gallery-under">
		<img 
			class="gallery-image" 
			src="${img.webformatURL}" 
			alt="${img.tags}" 
			/>
            <ul class="gallery-info">
        <li class="gallery-info-item">
          <h3>Likes</h3>
          <p>${img.likes}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Views</h3>
          <p>${img.views}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Comments</h3>
          <p>${img.comments}</p>
        </li>
        <li class="gallery-info-item">
          <h3>Downloads</h3>
          <p>${img.downloads}</p>
        </li>
      </ul></div>
	</a>
      `
    )
    .join('');
}
