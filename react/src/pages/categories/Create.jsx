import "../../styles/stories.scss";
import { useContext, useState } from "react";
import { Store, actionsList } from "../../store";
import { useFile } from "../../Use/useFile";

export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [donationAmount, setDonationAmount] = useState("");

    const { dispatch } = useContext(Store);
    const [file, readFile, remImage] = useFile();
    const create = (_) => {
        dispatch(
            actionsList["stories-create"]({
                file,
                title,
                description,
                goal_sum: donationAmount,
            })
        );
        setTitle("");
        setDescription("");
        setDonationAmount("");
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
                                    Story image
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
                                    placeholder="Your wish..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                                <label htmlFor="floatingInput">
                                    Wish title
                                </label>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Wish description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Your required amount..."
                                    value={donationAmount}
                                    onChange={(e) =>
                                        setDonationAmount(e.target.value)
                                    }
                                ></input>
                                <label htmlFor="floatingInput">Wish goal</label>
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
