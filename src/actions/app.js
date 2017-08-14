import store from '../store'
import history from '../history'

class AppActions {

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

    setLoading = (active) => {
        this._dispatch('APP_LOADING', active);
    }

    setError = (message) => {
        this._dispatch('APP_SHOW_ERROR', message);
    }

    hideError = () => {
        this._dispatch('APP_HIDE_ERROR');
    }

    _dispatch(type, body = {}) {
        store.dispatch({
            type,
            body
        });
    }
}

export default new AppActions();