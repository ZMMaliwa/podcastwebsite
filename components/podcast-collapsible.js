// @ts-ignore
import { html, LitElement, css, map } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { connect } from '../store.js';

class Component extends LitElement {
	static get properties () {
		return {
			season: { state: true },
		};
	};

	constructor () {
		super();
		this.disconnectStore = connect((state) => {
			//
			if (this.season?.toString() === state.season?.toString()) return;
			this.season = state.season;
			//
			if (this.single === state.single) return;
			this.single = state.single;
		});

	};

	disconnectedCallback () { this.disconnectStore(); }

	static styles = css`

	`;

	render () {
		//
		let episodes = this.single.seasons.filter((season) => {
			return +season.season === +this.season;
		}).map(({ episodes, season }) => {
			return html`
					<h2>Season ${ season } - ${ episodes.length } episodes</h2>
					<section>${ episodes.map((episode) => {
				return html`
						<div>
							<span>Episode ${ episode.episode }</span>
							<h2>${ episode.title }</h2>
							<p class="line-clamp">${ episode.description }</p>
							<audio controls preload="metadata">
								<source src="${ episode.file }" type="audio/mp3">
							</audio>
						</div>
						`;
					}) }</section>
			`;
		});

		return html`
			<div>${ episodes }</div>
        `;
	};
}

// @ts-ignore
customElements.define('podcast-collapsible', Component);
