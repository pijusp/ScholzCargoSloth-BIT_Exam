import "../styles/home.scss";

export default function Home() {
    return (
        <div className="menu-image-container">
            <img
                src="/GoDonateMe.png"
                alt="Go donate me!"
                className="menu-photo"
            />
            <div className="menu-image-text">
                <h2>About Scholz Cargosloth</h2>
                <p>
                    Scholz Cargosloth is a web application that allows users to
                    perform CRUD (Create, Read, Update, Delete) actions on
                    shipment boxes. The company name is a playful nod to Schmitz
                    Cargobull, one of the leading manufacturers of semi-trailers
                    for commercial vehicles. However, the "Scholz" part of the
                    name is a satirical take on the slow actions of Olaf Scholz
                    towards helping innocent people caught in war. Despite the
                    tongue-in-cheek reference, the project has good intentions
                    at its core: to provide a simple and user-friendly interface
                    for managing shipment boxes.
                </p>
                <p>
                    The application is built using the popular React library for
                    the frontend, with Express.js providing a lightweight and
                    flexible backend framework. The database is managed by
                    MySQL, allowing for efficient storage and retrieval of data.
                    Users can perform all CRUD operations on shipment boxes,
                    including adding new boxes, editing existing ones, and
                    deleting them when no longer needed. The interface is
                    designed to be intuitive and easy to use, with clear visual
                    cues to guide users through the process.
                </p>
                <p>
                    In summary, Scholz Cargosloth is a React Express and MySQL
                    project that aims to simplify the management of shipment
                    boxes. While the company name is a playful jab at a
                    political figure, the project has good intentions and
                    provides a useful tool for businesses and individuals alike.
                </p>
                <p>
                    Join us today and be a part of the movement to create a
                    better world for all.
                </p>
            </div>
        </div>
    );
}
