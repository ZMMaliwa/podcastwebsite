
class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-preview</div>0'
    }
}

customElements.define('podcast-preview', Component)