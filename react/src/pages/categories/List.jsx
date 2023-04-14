import { useContext } from "react";
import { Store, actionsList } from "../../store";

export default function List() {
    const { store, dispatch, imgUrl } = useContext(Store);
    return (
        <>
            <div className="card-header" style={{ textAlign: "center" }}>
                <h2>Boxes List</h2>
            </div>
            <div
                className="row row-cols-1 row-cols-xxl-3 row-cols-xl-2 row-cols-lg-1 g-4"
                style={{ padding: "20px" }}
            >
                {store?.data?.map((boxes) => (
                    <div className="col" key={boxes.id}>
                        <div className="card" style={{ width: "30rem" }}>
                            <div className="card-body">
                                {boxes.img ? (
                                    <img
                                        src={imgUrl + boxes.img}
                                        alt="some view"
                                    />
                                ) : (
                                    <img
                                        src={imgUrl + "noimg.png"}
                                        alt="some view"
                                    />
                                )}
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{boxes.title}</h4>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Weight: {boxes.weight} kg
                                </li>
                                <li className="list-group-item">
                                    Is it flammable?: {boxes.flammable}
                                </li>
                                <li className="list-group-item">
                                    Is it short-term?: {boxes.short_term}
                                </li>
                            </ul>

                            <div className="card-body btn-container">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={(_) => {
                                        dispatch(
                                            actionsList["boxes-show-edit"](
                                                boxes.id
                                            )
                                        );
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={(_) => {
                                        dispatch(
                                            actionsList["boxes-delete"](
                                                boxes.id
                                            )
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
