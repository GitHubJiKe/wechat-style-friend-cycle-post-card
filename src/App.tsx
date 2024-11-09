import { useEffect, useRef, useState } from "react";
import { bgImg, avatarImg, picsList } from "./constants";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
    const [username, setUsername] = useState("Aristotle");
    const [bg, setBg] = useState(bgImg);
    const [avatar, setAvatar] = useState(avatarImg);
    const [pics, setPic] = useState([...picsList]);
    const [quote, setQuote] = useState(
        "时间碾碎万物；一切都因时间的力量而衰老，在时间的流逝中被遗忘。",
    );

    // const [showThumbUp, setShowThumbUp] = useState(false);

    const mainRef = useRef(null);

    const syncMap = {
        username: setUsername,
        bg: setBg,
        avatar: setAvatar,
        pics: setPic,
        quote: setQuote,
    };

    useEffect(() => {
        for (const key in syncMap) {
            const value = sessionStorage.getItem(key);
            if (value) {
                // @ts-ignore
                syncMap[key](key === "pics" ? value.split(",") : value);
            }
        }
    }, []);

    const downlaodAction = async () => {
        const url = await toPng(mainRef.current!);
        // @ts-ignore
        window.download(url, username + ".png");
    };

    return (
        <>
            <a className="float" href="https://unsplash.com/" target="_blank">
                pictures from unsplash
            </a>
            <main ref={mainRef}>
                <div className="bg" style={{ backgroundImage: `url(${bg})` }}>
                    <div className="userInfo">
                        <label className="username">{username.trim()}</label>
                        <div
                            className="avatar"
                            style={{ backgroundImage: `url(${avatar})` }}
                        />
                    </div>
                </div>
                <div className="timeline">
                    <div className="userInfo">
                        <div
                            className="avatar"
                            style={{ backgroundImage: `url(${avatar})` }}
                        />
                        <label className="username">{username.trim()}</label>
                    </div>
                    <p className="quote">
                        {quote}
                        <div className={`pics pic-${pics.length}`}>
                            {pics.map((pic, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="pic"
                                        style={{
                                            backgroundImage: `url(${pic})`,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </p>
                    {/* {showThumbUp && (
                        <div className="thumbUp">
                            <div className="item">
                                <img src={sbt} alt="ava" /> :
                                <label>👍🏻👍🏻👍🏻</label>
                            </div>
                        </div>
                    )} */}
                </div>
            </main>
            <section className="form">
                {/* <div>
                    <input
                        type="checkbox"
                        checked={showThumbUp}
                        onChange={(e) => {
                            setShowThumbUp(e.currentTarget.checked);
                        }}
                        id="showThumbUp"
                    />
                    <label>点赞</label>
                </div> */}
                <input
                    type="text"
                    placeholder="your name"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.currentTarget.value);
                        sessionStorage.setItem(
                            "username",
                            e.currentTarget.value,
                        );
                    }}
                />
                <textarea
                    placeholder="your quote"
                    style={{ resize: "vertical" }}
                    rows={4}
                    value={quote}
                    onChange={(e) => {
                        setQuote(e.currentTarget.value.trim());
                        sessionStorage.setItem(
                            "quote",
                            e.currentTarget.value.trim(),
                        );
                    }}
                />
                <textarea
                    placeholder="your background image"
                    style={{ resize: "vertical" }}
                    // value={bg}
                    rows={4}
                    onChange={(e) => {
                        setBg(e.currentTarget.value.trim());
                        sessionStorage.setItem(
                            "bg",
                            e.currentTarget.value.trim(),
                        );
                    }}
                />
                <textarea
                    placeholder="your avatar"
                    style={{ resize: "vertical" }}
                    // value={avatar}
                    rows={4}
                    onChange={(e) => {
                        setAvatar(e.currentTarget.value.trim());
                        sessionStorage.setItem(
                            "avatar",
                            e.currentTarget.value.trim(),
                        );
                    }}
                />
                <textarea
                    placeholder="your pictures to share (split by ,)"
                    style={{ resize: "vertical" }}
                    // value={pics.join(",")}
                    rows={4}
                    onChange={(e) => {
                        const list = e.currentTarget.value.trim().split(",");
                        setPic(list);
                        sessionStorage.setItem(
                            "pics",
                            e.currentTarget.value.trim(),
                        );
                    }}
                />
                <button className="downlaod" onClick={downlaodAction}>
                    download
                </button>
            </section>
        </>
    );
}

export default App;
