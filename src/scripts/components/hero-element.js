import heroLargeImage from '../../public/images/hero-image_2-large.jpg';
import heroSmallImage from '../../public/images/hero-image_2-small.jpg';

class heroElement extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
        <div class="hero">
            <picture>
                <source media="(max-width: 600px)" 
                srcset="${heroSmallImage}" width="100%" height="100%">
                <img 
                    src="${heroLargeImage}" width="100%" height="100%"
                    alt="Cerita RestoFind"></img>
            </picture>
            <div class="hero__inner">
                <h1 class="hero__title">Temukan Restoran yang Anda Inginkan</h1>
                <p class="hero__tagline">Banyak Restoran yang telah bergabung untuk memberikan anda pengalaman makan terbaik</p>
            </div>
        </div>`;
	}
}

customElements.define('hero-element', heroElement);
