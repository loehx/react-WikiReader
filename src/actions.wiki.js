import store from './store'
import history from './history'


class WikiActions {


    openSearch() {
        history.push('/');
        this._dispatch('WIKI_SEARCH', {});
    }

    openArticle(name) {
        history.push('/article/' + encodeURIComponent(name));
        this._dispatch('WIKI_ARTICLE', {});
    }

    openOriginalPage(name) {
        window.open('https://en.wikipedia.org/wiki/' + encodeURIComponent(name), '_BLANK');
    }


    searchFor(term, limit) {
        const start = new Date();

        this._dispatch('WIKI_SEARCH', {});

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
                this._dispatch('WIKI_SEARCH', {
                    took: new Date() - start,
                    items: results
                });
            }, (err) => {
                this._dispatch('WIKI_SEARCH', {
                    took: new Date() - start,
                    error: err
                });
            })
    }

    fetchArticle(name) {
        const start = new Date();
        this._dispatch('WIKI_ARTICLE', { name });

        fetch('//en.wikipedia.org/w/api.php?origin=*&action=query&titles=' + encodeURIComponent(name) + '&redirects&format=json&prop=extracts|extlinks&explaintext=1')
            .then(response => response.json())
            .then((json) => {
                let markdown = Object.values(json.query.pages)[0].extract;
            
                markdown = markdown
                    .replace(/========/g, '########')
                    .replace(/=======/g, '#######')
                    .replace(/======/g, '######')
                    .replace(/=====/g, '#####')
                    .replace(/====/g, '####')
                    .replace(/===/g, '###')
                    .replace(/==/g, '##');

                this._dispatch('WIKI_ARTICLE', {
                    took: new Date() - start,
                    markdown
                });
            }, (error) => {
                this._dispatch('WIKI_ARTICLE', {
                    took: new Date() - start,
                    error
                });
            })
    }

    _dispatch(type, body = {}) {
        store.dispatch({ type, body });
    }
}

const wikiActions = new WikiActions();
export default wikiActions;