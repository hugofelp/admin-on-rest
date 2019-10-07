import { END } from 'redux-saga';

export default (function (emitter) {
    return {
        complete: function complete() {
            emitter(END);
        },
        error: function error() {
            emitter(END);
        },
        next: function next(value) {
            emitter(value);
        }
    };
});