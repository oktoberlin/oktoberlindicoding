class navBar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
        <header class="header">
            <div class="nav-menu">
                <button id="menu" aria-label="Navigasi Drawer">☰</button>
            </div>
            <div class="app-bar__brand">
                <h1>RestoFind</h1>
            </div>
            <nav id="drawer" class="nav">
                <ul>
                    <li><a href="#/">Home</a></li>
                    <li><a href="#/favorit">Favorite</a></li>
                    <li><a href="https://github.com/oktoberlin">About Us</a></li>
                </ul>
            </nav>
        </header>`;
	}
}

customElements.define('nav-bar', navBar);