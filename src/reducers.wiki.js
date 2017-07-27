import WikiActions from './actions.wiki';

const DEFAULT_STATE = {
    articles: [],
    isLoading: false,
    isComplete: false,
    errorMessage: null
};

export default function WikiReducer(state = null, action) {
    const { body } = action;

    if (!state) state = DEFAULT_STATE;
    if (!body) return state;

    state = { ...state };

    if (body.took) state.took = body.took;
    if (body.name) state.url = "https://en.wikipedia.org/wiki/" + encodeURIComponent(body.name);

    if (body.error) {
        return { ...state,
            isComplete: true,
            isLoading: false,
            errorMessage: body.error.message
        }
    }

    switch(action.type) {
        case 'WIKI_SEARCH':

            if (body.items) {
                return  { ...state,
                    isLoading: false,
                    isComplete: true,
                    articles: body.items
                };
            }
            else {
                return { ...state,
                    isLoading: true,
                    isComplete: false
                };
            }

        case 'WIKI_ARTICLE':

            if (body.name)
                state = { ...state, name: body.name }

            if (body.markdown) {
                return { ...state,
                    isLoading: false,
                    isComplete: true,
                    markdown: body.markdown
                };
            }
            else {
                return { ...state,
                    isLoading: true,
                    isComplete: false
                };
            }
    }

    return state;
}