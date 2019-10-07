import { eventChannel } from 'redux-saga';
import realtimeObserver from './realtimeObserver';

export var createSubscribeFactory = function createSubscribeFactory(realtimeObserverImpl) {
    return function (watcher, emitter) {
        var observer = realtimeObserverImpl(emitter);
        var result = watcher.subscribe(observer);

        return result.unsubscribe;
    };
};

export default (function (watcher) {
    return eventChannel(function (emitter) {
        return createSubscribeFactory(realtimeObserver)(watcher, emitter);
    });
});