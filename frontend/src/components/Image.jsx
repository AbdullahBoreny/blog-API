import { useEffect, useState } from "react";
import useImageURL from "../customHooks/useImageURL";
const Image = () => {
    const { loading, error, imageURL } = useImageURL();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A network error was encountered</p>;
    return (
        <>
            <h1>An image</h1>
            <img src={imageURL} alt={"placeholder text"} />
        </>
    );
};


export default Image;