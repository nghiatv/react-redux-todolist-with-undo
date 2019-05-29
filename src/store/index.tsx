import { createStore } from "redux";
import { reducer } from "./reducers";
import { undoable } from "./reducers/history";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, undoable(reducer));

/* tslint:disable */
export const store = createStore(
  persistedReducer, /* preloadedState, */
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
/* tslint:enable */
export const persistor = persistStore(store);
