import { createStore, compose, applyMiddleware } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

// import { AsyncStorage } from "react-native";

import reducers from "./reducers/reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  // if (module.hot) {
  //   module.hot.accept('../redux/reducers/index', () => {
  //     // This fetch the new state of the above reducers.
  //     const nextRootReducer = require('../redux/reducers/index').default;
  //     store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
  //   });
  // }
  return { store, persistor };
};
