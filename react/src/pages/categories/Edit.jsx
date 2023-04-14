import { useContext, useState } from "react";

import { actionsList, Store } from "../../store";

export default function Edit() {
    const { store, dispatch } = useContext(Store);

    const [title, setTitle] = useState(store?.data?.title);
    const [weight, setWeight] = useState(store?.data?.weight);
    const [flammable, setFlammable] = useState(store?.data?.flammable);
    const [shortterm, setShortterm] = useState(store?.data?.short_term);

    const edit = (_) => {
        dispatch(
            actionsList["boxes-edit"](
                {
                    title,
                    weight,
                    flammable,
                    short_term: shortterm,
                    action: "updateBox",
                },
                store?.data?.id
            )
        );
    };
    return (
        <div className="container-lg">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card m-5">
                        <div className="card-header">Edit your shipment</div>
                        <div className="card-body">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Your shipments' name..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">
                                    New shipment title?
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Your box weight..."
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">
                                    Weight of the box
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Is the shipment flammable?"
                                    value={flammable}
                                    onChange={(e) =>
                                        setFlammable(e.target.value)
                                    }
                                ></input>
                                <label htmlFor="floatingInput">
                                    Is the shipment flammable?
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Is the shipment short-term?"
                                    value={shortterm}
                                    onChange={(e) =>
                                        setShortterm(e.target.value)
                                    }
                                ></input>
                                <label htmlFor="floatingInput">
                                    Is the shipment short-term?
                                </label>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={edit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
