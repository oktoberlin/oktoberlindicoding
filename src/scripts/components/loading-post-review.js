import loadingImageWebm from '../../public/loading/loading.webm';
import loadingImageMp4 from '../../public/loading/loading.mp4';

class loadingPostReviewIndicator extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
        <div id="loading-post-review">
			<video autoplay loop muted playsinline width="50">
				<source src="${loadingImageWebm}" type="video/webm">
				<source src="${loadingImageMp4}" type="video/mp4">
			</video>
        </div>`;
	}
}

customElements.define('loading-post-review', loadingPostReviewIndicator);