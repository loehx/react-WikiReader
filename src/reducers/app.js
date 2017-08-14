const DEFAULT_STATE = { };

export default function AppReducer(state = DEFAULT_STATE, action) {
    const {body} = action;

    switch (action.type) {

        case 'APP_LOADING':
            state = {
                ...state,
                loading: body,
                complete: !body
            };
            break;
        case 'APP_SHOW_ERROR':
            state = {
                ...state,
                errorMessage: body
            };
            break;
        case 'APP_HIDE_ERROR':
            state = {
                ...state
            };
            delete state['errorMessage'];
            break;

    }

    return state;
}