
import AppDispatcher from '../dispatcher/AppDispatcher'
import EventEmitter from 'events';

class WikiActions {

    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    searchFor(term, limit) {
        const start = new Date();
        this._dispatch('LOADING', true);

        fetch('//en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=' + limit + '&format=json&search=' + encodeURIComponent(term))
            .then(response => response.json())
            .then(json => {
                if (json.error)
                    throw json.error.info;
                return json;
            })
            .then((json) => {


                const names = json[1];
                const descriptions = json[2];
                const links = json[3];
                const results = [];

                for(let i = 0; i < Math.min(names.length, links.length); i++) {
                    results.push({
                        name: names[i],
                        description: descriptions[i],
                        link: links[i]
                    });
                }
                this._dispatch('LOADING', false);
                this._dispatch('WIKI_SEARCH_RESULT', {
                        searchTerm: json[0],
                        took: new Date() - start,
                        items: results
                    });
            }, (err) => {
                this._dispatch('LOADING', false);
                this._dispatch('ERROR', err);
            })
    }

    openArticle(articleInfo) {
        const start = new Date();
        this._dispatch('LOADING', true);
        const { name } = articleInfo;

        fetch('//en.wikipedia.org/w/api.php?origin=*&action=query&titles=' + encodeURIComponent(name) + '&redirects&format=json&prop=extracts|extlinks&explaintext=1')
            .then(response => response.json())
            .then(json => {
                const text = Object.values(json.query.pages)[0].extract;
                return fetch('//en.wikipedia.org/w/api.php?origin=*&action=parse&contentmodel=wikitext&text=' + encodeURIComponent(text)); 
            })
            .then(response => response.text())
            .then((html) => {

                debugger;
                this._dispatch('LOADING', false);
                this._dispatch('WIKI_ARTICLE_FETCHED', {
                        html,
                        took: new Date() - start
                    });
            }, (err) => {
                this._dispatch('LOADING', false);
                this._dispatch('ERROR', err);
            })
    }

    on(type, callback) {
        this.eventEmitter.on(type, callback);
    }

    _trigger(action) {
        console.log('TRIGGER', action.type, action.body);
        this.eventEmitter.emit(action.type, action.body);
    }

    _dispatch(type, body) {
        AppDispatcher.dispatch({
            type,
            body
        })
    }
}

const wikiActions = new WikiActions();

AppDispatcher.register(wikiActions._trigger.bind(wikiActions));

export default wikiActions;