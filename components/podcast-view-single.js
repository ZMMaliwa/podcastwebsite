import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if (this.single === state.single) return;
            this.single = state.single;
            if (this.season?.toString() === state.season.toString()) return;
            this.season = state.season;
            if (this.previews !== state.previews) { this.previews = state.previews; }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting; }
            if (this.search !== state.search) { this.search = state.search; }
        });
    }

    disconnectedCallback() { this.disconnectStore() }

    static styles = css`
        h1 {
            color: purple;
        }

        img {
            width: 100px;
            height: 100px;
        }
    `;

    render () {

        const previews = this.previews;

        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true;
            return item.title.toLowerCase().includes(this.search.toLowerCase());
        });

        /**
         * @type {import('../types').show}
         */
        const show = this.single
        if (!show) {
            return html`<div></div>`
        }

        const backHandler = () => store.loadList()
        const handleClick = async (event) => {
            await store.renderSeason(event.target.dataset.season);
        };

        const seasonsTitle = show.seasons.map(({ season }) => {
            return html`
                <a @click="${ handleClick }" data-season="${ season }">Season ${ season }</a>
            `;
        });

        const seasons = show.seasons.map(({ episodes, title }) => {
            return html`
                <div>
                    <strong>${title}</strong>
                    ${episodes.map(({ file, title: innerTitle }) => {
                        return html`
                            <div>
                                <div>${innerTitle}</div>
                                <audio controls>
                                    <source src="${file}" type="audio/mp3">
                                </audio>
                            </div>
                        `
                    })}
                </div>
            `
        })

        return html`
            <button @click="${backHandler}">👈 BACK</button>
            <h1>${show.title || ''}</h1>
            <img src="${show.image}">
            ${seasons}
        `
    }
}

customElements.define('podcast-view-single', Component)