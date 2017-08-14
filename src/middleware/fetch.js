import AppActions from '../actions/app';

function fetchMiddleware() {
    return store => next => action => {
        const {body} = action;
        if (!body || !body.fetch || action._start) return next(action); // no fetching needed or fetching already started.

        action._start = new Date();

        next({
            type: action.type + '_FETCHING',
            body: {
                ...body
            }
        });
        AppActions.setLoading(true);

        fetch(body.fetch.url, body.fetch)
            .then(body.fetch.dataExtractor || (r => r.json()))
            .then(data => {
                body.data = data;
                body.took = new Date() - action._start;
                next(action);
                AppActions.setLoading(false);
            }, error => {
                next({
                    type: action.type + '_ERROR',
                    body: {
                        ...body,
                        error: error.message,
                        took: new Date() - action._start
                    }
                });
                AppActions.setLoading(false);
                AppActions.setError(error.message);
            })
    };
}

export default fetchMiddleware;
