class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-meta</div>0'
    }
}

customElements.define('podcast-meta', Component)