import "../../styles/stories.scss";
import { useContext, useState } from "react";
import { Store, actionsList } from "../../store";
import { useFile } from "../../Use/useFile";

export default function Create() {
    const [title, setTitle] = useState("");
    const [weight, setWeight] = useState("");
    const [flammable, setFlammable] = useState("");
    const [shortterm, setShortterm] = useState("");

    const { dispatch } = useContext(Store);
    const [file, readFile, remImage] = useFile();
    const create = (_) => {
        dispatch(
            actionsList["boxes-create"]({
                file,
                title,
                weight,
                flammable,
                short_term: shortterm,
            })
        );
        setTitle("");
        setWeight("");
        setFlammable("");
        setShortterm("");
        remImage();
    };
    return (
        <div className="container-lg">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="card m-5">
                        <div className="card-header">What's your wish?</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label
                                    htmlFor="formFile"
                                    className="form-label"
                                >
                                    Box image
                                </label>
                                <input
                                    className="form-control form-control-sm"
                                    id="formFile"
                                    type="file"
                                    onChange={readFile}
                                />
                                <div className="form-text">
                                    Will you add an image?
                                </div>
                                <button
                                    className="m-1 btn btn-danger"
                                    onClick={remImage}
                                >
                                    Remove image
                                </button>
                            </div>
                            <div>
                                {file ? (
                                    <img
                                        className="upload-image mb-3"
                                        src={file}
                                        alt="to upload"
                                    />
                                ) : null}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Your shipment name..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">
                                    Shipment box title
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Box weight..."
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">
                                    Shipment weight
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Is it flammable? yes/no..."
                                    value={flammable}
                                    onChange={(e) =>
                                        setFlammable(e.target.value)
                                    }
                                ></input>
                                <label htmlFor="floatingInput">
                                    Is the shipment flammable? yes/no
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Is it flammable? yes/no..."
                                    value={shortterm}
                                    onChange={(e) =>
                                        setShortterm(e.target.value)
                                    }
                                ></input>
                                <label htmlFor="floatingInput">
                                    Is the shipment short-term? yes/no
                                </label>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={create}
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
