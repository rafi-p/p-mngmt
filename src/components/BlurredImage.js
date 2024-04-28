import { useState, useEffect } from "react";
import { decode } from "blurhash";
import './BlurredImage.css'

function BlurredImage({ imageUrl, blurhash, width, height }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;
    
        image.onload = () => {
            setImageLoaded(true);
        };
    
        image.onerror = () => {
            setImageError(true);
        };
    
        return () => {
          // Clean up the image object
            image.onload = null;
            image.onerror = null;
        };
    }, [imageUrl]);
    
    const renderImage = () => {
        if (imageError) {
            // Handle image loading error
            return <div>Error loading image</div>;
        }
    
        if (imageLoaded) {
            // Image is fully loaded, render the actual image
            return <img src={imageUrl} alt="Loaded" width={width} height={height} />;
        }
    
        if (blurhash) {
            // Decode the blurhash and render the blurred image
            const pixels = decode(blurhash, width, height);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const imageData = ctx.createImageData(width, height);
            imageData.data.set(pixels);
            ctx.putImageData(imageData, 0, 0);
            const blurredImageUrl = canvas.toDataURL();
            return (
                <img
                    src={blurredImageUrl}
                    alt="Loading"
                    width={width}
                    height={height}
                    style={{ filter: "blur(20px)" }}
                />
            );
        }
    
        // Render a placeholder or loading state
        return <div>Loading...</div>;
    };
    
    return <div className="avatar">{renderImage()}</div>;
}

export default BlurredImage