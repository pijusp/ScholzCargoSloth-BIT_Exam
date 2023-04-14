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
                <h2>About Go-donate-me</h2>
                <p>
                    Welcome to our crowdfunding platform, where people come
                    together to help each other and make a positive impact on
                    society. Our platform, "Go-Donate-Me," is all about enabling
                    individuals and communities to create positive change
                    through collective action.
                </p>
                <p>
                    Through our platform, anyone can create a campaign and raise
                    funds for causes they care about, whether it's helping a
                    friend in need, supporting a local charity, or contributing
                    to a global cause. Our platform is built on the idea that
                    small acts of kindness can have a big impact, and that when
                    people come together to support each other, anything is
                    possible.
                </p>
                <p>
                    We believe that everyone has the power to make a difference,
                    and our platform makes it easy for people to connect with
                    others who share their values and beliefs. By supporting
                    each other, we can create a more compassionate, inclusive,
                    and equitable society, where everyone has the opportunity to
                    thrive.
                </p>
                <p>
                    Join us today and be a part of the movement to create a
                    better world for all.
                </p>
            </div>
        </div>
    );
}
