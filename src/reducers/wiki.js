const DEFAULT_STATE = {
    articles: []
};

export default function WikiReducer(state = null, action) {
    const {body} = action;

    if (!state)
        state = DEFAULT_STATE;

    if (!body) return state;

    if (body.took)
        state.took = body.took;

    if (body.name)
        state.url = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(body.name);

    switch (action.type) {
        case 'WIKI_SEARCH':
            return {
                ...state,
                articles: body.data
            };

        case 'WIKI_ARTICLE':

            return {
                ...state,
                name: body.name,
                took: body.took,
                markdown: body.data
            };

    }

    return state;
}