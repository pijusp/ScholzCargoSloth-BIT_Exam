import { useContext } from "react";
import { navigate } from "../actions";
import { Store } from "../store";

export default function Link({ to, children, className, action }) {
    const { actionsList, dispatch } = useContext(Store);

    const go = (e) => {
        e.preventDefault();
        // window.location.hash = to || action;
        if (to) {
            dispatch(navigate(to));
        } else {
            dispatch(actionsList[action]());
        }
    };

    return (
        <a href={to || action} className={className} onClick={go}>
            {children}
        </a>
    );
}
