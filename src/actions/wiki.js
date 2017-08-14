import store from '../store'


class WikiActions {

    searchFor(term, limit) {
        this._dispatch('WIKI_SEARCH', {
            fetch: {
                url: '//en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=' + limit + '&format=json&search=' + encodeURIComponent(term),
                dataExtractor: response => response.json().then((json) => {
                    if (json.error)
                        throw json.error.info;

                    const names = json[1];
                    const descriptions = json[2];
                    const links = json[3];
                    const results = [];

                    for (let i = 0; i < Math.min(names.length, links.length); i++) {
                        results.push({
                            name: names[i],
                            description: descriptions[i],
                            link: links[i]
                        });
                    }

                    return results;
                })
            }
        });
    }

    fetchArticle(name) {
        this._dispatch('WIKI_ARTICLE', {
            name,
            fetch: {
                url: '//en.wikipedia.org/w/api.php?origin=*&action=query&titles=' + encodeURIComponent(name) + '&redirects&format=json&prop=extracts|extlinks&explaintext=1',
                dataExtractor: response => response.json().then((json) => {
                    if (json.error)
                        throw json.error.info;

                    let markdown = Object.values(json.query.pages)[0].extract;
                    return markdown
                        .replace(/(={2,})/g, (a) => Array(a.length + 1).join('#')); // convert headings to default markdown
                })
            }
        });
    }

    _dispatch(type, body = {}) {
        store.dispatch({
            type,
            body
        });
    }
}

export default new WikiActions();