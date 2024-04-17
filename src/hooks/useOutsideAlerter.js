import { useEffect, useRef } from "react";

function useOutsideAlerter(callback) {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback(false);
            document.body.style.overflow = ""
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref };
}

export default useOutsideAlerter