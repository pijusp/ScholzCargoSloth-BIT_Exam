import {
    NAVIGATE,
    BOXES_CREATE,
    BOXES_LIST,
    BOXES_DELETE,
    BOXES_SHOW_EDIT,
    BOXES_EDIT,
    ADD_NEW_USER,
} from "./types";

export const navigate = (to) => {
    return {
        type: NAVIGATE,
        payload: {
            to,
        },
    };
};
export const boxesList = (_) => {
    return {
        type: BOXES_LIST,
        payload: {
            url: "admin/boxes",
            method: "get",
            page: "boxes-list",
        },
    };
};
export const boxesCreate = (body) => {
    return {
        type: BOXES_CREATE,
        payload: {
            url: "admin/boxes",
            method: "post",
            body,
            show: "boxes-list",
        },
    };
};
export const boxesDelete = (id) => {
    return {
        type: BOXES_DELETE,
        payload: {
            url: "admin/boxes/" + id,
            method: "delete",
            show: "boxes-list",
            pauseShow: 0,
        },
    };
};

export const boxesShowEdit = (id) => {
    return {
        type: BOXES_SHOW_EDIT,
        payload: {
            url: "admin/boxes/" + id,
            method: "get",
            page: "boxes-show-edit",
        },
    };
};
export const boxesEdit = (body, id) => {
    return {
        type: BOXES_EDIT,
        payload: {
            url: "admin/boxes/" + id,
            method: "put",
            body,
            show: "boxes-list",
            pauseShow: 1000,
        },
    };
};
export const usersCreate = (body) => {
    return {
        type: ADD_NEW_USER,
        payload: {
            url: "admin/users",
            method: "post",
            body,
            show: "login",
        },
    };
};
