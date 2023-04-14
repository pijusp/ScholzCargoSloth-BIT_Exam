import { useContext, useState } from "react";
import { Store, actionsList } from "../../store";
function sortStories(stories) {
    return stories.sort((a, b) => {
        if (a.current_sum === a.goal_sum) {
            // a has already reached its goal
            if (b.current_sum === b.goal_sum) {
                // b has also reached its goal, sort by id
                return a.id - b.id;
            } else {
                // b has not reached its goal, so a comes after b
                return 1;
            }
        } else {
            // a has not reached its goal
            if (b.current_sum === b.goal_sum) {
                // b has already reached its goal, so a comes before b
                return -1;
            } else {
                // both a and b have not reached their goals, sort by goal_sum
                return a.goal_sum - b.goal_sum;
            }
        }
    });
}

export default function List() {
    const { store, dispatch, imgUrl } = useContext(Store);
    // create state to hold the input values for each card
    const [inputs, setInputs] = useState({});
    const updateInput = (id, name, value) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [id]: {
                ...prevInputs[id],
                [name]: value,
            },
        }));
    };
    const sortedStories = sortStories(store?.data || []);
    return (
        <>
            <div className="card-header" style={{ textAlign: "center" }}>
                <h2>Stories List</h2>
            </div>
            <div
                className="row row-cols-1 row-cols-xxl-3 row-cols-xl-2 row-cols-lg-1 g-4"
                style={{ padding: "20px" }}
            >
                {sortedStories.map((stories) => (
                    <div className="col" key={stories.id}>
                        <div className="card" style={{ width: "30rem" }}>
                            <div className="card-body">
                                {stories.img ? (
                                    <img
                                        src={imgUrl + stories.img}
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
                                <h4 className="card-title">{stories.title}</h4>
                                <p className="card-text">
                                    {stories.description}
                                </p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    Start sum: {stories.start_sum}
                                </li>
                                <li className="list-group-item">
                                    Current sum: {stories.current_sum}
                                </li>
                                <li className="list-group-item">
                                    Goal sum: {stories.goal_sum}
                                </li>
                            </ul>
                            {stories.current_sum >= stories.goal_sum ? (
                                <p className="donation-notification">
                                    Donation goal has been reached!
                                </p>
                            ) : (
                                <div className="card-body">
                                    <div>
                                        <h6>Support this story</h6>
                                    </div>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name.."
                                        value={inputs[stories.id]?.name || ""}
                                        onChange={(e) =>
                                            updateInput(
                                                stories.id,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            stories.current_sum >=
                                            stories.goal_sum
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter the donation amount.."
                                        value={inputs[stories.id]?.amount || ""}
                                        onChange={(e) =>
                                            updateInput(
                                                stories.id,
                                                "amount",
                                                e.target.value
                                            )
                                        }
                                        disabled={
                                            stories.current_sum >=
                                            stories.goal_sum
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            // pass the card's input state to the action
                                            dispatch(
                                                actionsList[
                                                    "stories-add-donation"
                                                ](stories.id, {
                                                    ...inputs[stories.id],
                                                    action: "updateAmount",
                                                })
                                            );

                                            setInputs({});
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}

                            <div className="card-body btn-container">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={(_) => {
                                        dispatch(
                                            actionsList["stories-show-edit"](
                                                stories.id
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
                                            actionsList["stories-delete"](
                                                stories.id
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
