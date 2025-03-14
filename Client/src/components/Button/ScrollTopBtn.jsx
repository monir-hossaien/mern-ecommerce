import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";


const ScrollTopBtn = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`btn text-white  position-fixed translate-middle-x shadow ${
                visible ? "d-block" : "d-none"
            }`}
            style={{ zIndex: 1000, background: "#00234D",  borderRadius: "10%", padding: "10px 12px", bottom: "3rem", right: "1rem" }}
        >
            <FaArrowUp size={20} />
        </button>
    );
};

export default ScrollTopBtn;
