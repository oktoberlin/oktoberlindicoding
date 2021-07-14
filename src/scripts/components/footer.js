class footer extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
        <footer>
            <p>Copyright © 2021 - RestoFind Apps</p>
        </footer>`;
	}
}

customElements.define('footer-element', footer);
