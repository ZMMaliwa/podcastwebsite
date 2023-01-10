import { html, css, LitElement, map } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'
const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
            sorting: { state: true },
            search: { state: true },
        }
    }
    constructor() {
        super()
        this.disconnectStore = connect((state) => {
            if (this.previews !== state.previews) { this.previews = state.previews }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting }
            if (this.search !== state.search) { this.search = state.search }
        })
    }
    disconnectedCallback() { this.disconnectStore() }
    static styles = css`
        .list {
            display: flex;
            flex-wrap: wrap;
            justify-content: left;
            margin: 0;
            padding: 0;
            gap: 2rem;
        }
        li {
            width: 35ch;
            list-style: none;
        }
        .title {
            background-color: rgba(255, 255, 255, 0.2);
            text-align: center;
            margin-bottom: 0.5rem;
            color: white;
            outline: none;
            border-radius: 5%;
            font-size: 100%
        }
        .gen {
            width: 35ch;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        li img {
            width: 100%;    
            float: top;
            outline: none;
        }
        .frame {
            background-color: rgba(255, 255, 255, 0.2);
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 10%;
        }
    `;
    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const previews = this.previews
        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })
        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if (this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if (this.sorting === 'z-a') return b.title.localeCompare(a.title)
            const dateA = new Date(a.updated).getTime().toString().padStart(2, '0')
            const dateB = new Date(b.updated).getTime()
            if (this.sorting === 'oldest-latest') return dateA - dateB
            if (this.sorting === 'latest-oldest') return dateB - dateA
            throw new Error('Invalid sorting')
         })
        const list = sortedPreviews.map(({ title, id, updated, image, genres, seasons }) => {
            const date = new Date(updated)
            const day = date.getDate();
            const month = MONTHS[date.getMonth() - 1]
            const year = date.getFullYear()
            const clickHandler = () => store.loadSingle(id)
            return html`
                <div class='frame'>
                    <li>
                        <button class='title'  @click="${clickHandler}">${title}</button>
                        <img src="${ image }" alt="${ title }" />
                        <ul class='gen'>
                            ${ map(genres, (genre) => genre !== 'All' ? html`<li>${ genre }</li>` : null) }
                        </ul>
                        <span>
                            ${ seasons } Seasons
                        </span>
                        <div>Updated: ${day} ${month} ${year}</div>
                    </li>
                </div>
            `
        })
        return html`
            <h1>Podcast List</h1>
            <podcast-controls></podcast-controls>
            ${list.length > 0 ? html`<ul class="list">${list}</ul>` : html`<div>No matches</div>`}
        `
    }
}
customElements.define('podcast-view-list', Component)







