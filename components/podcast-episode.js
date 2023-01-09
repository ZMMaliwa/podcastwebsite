
class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-episode</div>0'
    }
}

customElements.define('podcast-episode', Component)