class errorMessage extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
        <div id="error-message"></div>`;
	}
}

customElements.define('error-message', errorMessage);