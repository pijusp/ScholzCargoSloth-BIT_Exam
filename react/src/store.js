import { createContext, useReducer, useState } from "react";
import main from "./reducers/main";
import {
    boxesCreate,
    boxesList,
    boxesDelete,
    boxesShowEdit,
    boxesEdit,
    usersCreate,
} from "./actions";
import axios from "axios";

export const actionsList = {
    "boxes-list": boxesList,
    "boxes-create": boxesCreate,
    "boxes-delete": boxesDelete,
    "boxes-show-edit": boxesShowEdit,
    "boxes-edit": boxesEdit,
    "add-new-user": usersCreate,
};
const url = "http://localhost:3003/";
const imgUrl = "http://localhost:3003/img/";

export const Store = createContext();

export const Provider = (props) => {
    const [loader, setLoader] = useState(false);
    const [store, dispatch] = useReducer(main, {
        page: "home",
        pageTop: "nav",
    });

    const dataDispatch = (action) => {
        if (!action.payload || !action.payload.url) {
            dispatch(action);
            setLoader(false);
        } else {
            const args = [url + action.payload.url];
            if (action.payload.body) {
                args.push(action.payload.body);
            }
            setLoader(true);
            axios[action.payload.method](...args).then((res) => {
                action = {
                    ...action,
                    payload: {
                        ...action.payload,
                        ...res.data,
                    },
                    doDispatch,
                };
                dispatch(action);
                if (!action.payload.show) {
                    setLoader(false);
                }
            });
        }
    };
    const doDispatch = (action) => {
        dataDispatch(action);
    };

    return (
        <Store.Provider
            value={{
                page: store.page,
                pageTop: store.pageTop,
                store,
                dispatch: dataDispatch,
                actionsList,
                messages: store.messages,
                loader,
                start: () => setLoader(true),
                imgUrl,
            }}
        >
            {props.children}
        </Store.Provider>
    );
};
