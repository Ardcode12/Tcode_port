import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import '../../styles/components/FrameScrollAnimation.css';

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/frames/ezgif-frame-';

const FrameScrollAnimation = forwardRef(({ children, scrollProgress }, ref) => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    // Preload all images
    useEffect(() => {
        const loadImages = async () => {
            let loadedCount = 0;

            const loadImage = (index) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    const frameNumber = String(index).padStart(3, '0');
                    img.src = `${FRAME_PATH}${frameNumber}.jpg`;

                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };

                    img.onerror = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                });
            };

            const frameIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);
            const imageArray = await Promise.all(frameIndices.map(loadImage));

            setImages(imageArray);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Draw frame based on scroll
    useEffect(() => {
        if (images.length === 0 || isLoading || !scrollProgress) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const updateCanvas = () => {
            const progress = scrollProgress.get();
            const frameIndex = Math.min(
                Math.floor(progress * TOTAL_FRAMES),
                TOTAL_FRAMES - 1
            );

            if (frameIndex !== currentFrameRef.current && images[frameIndex]) {
                currentFrameRef.current = frameIndex;
                const img = images[frameIndex];

                if (img.complete && img.naturalWidth > 0) {
                    // Clear and draw
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Calculate aspect ratio fit
                    const imgAspect = img.naturalWidth / img.naturalHeight;
                    const canvasAspect = canvas.width / canvas.height;

                    let drawWidth, drawHeight, drawX, drawY;

                    if (imgAspect > canvasAspect) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgAspect;
                        drawX = 0;
                        drawY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawHeight = canvas.height;
                        drawWidth = canvas.height * imgAspect;
                        drawX = (canvas.width - drawWidth) / 2;
                        drawY = 0;
                    }

                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                }
            }
        };

        // Initial draw
        updateCanvas();

        // Subscribe to scroll changes
        const unsubscribe = scrollProgress.on('change', () => {
            requestAnimationFrame(updateCanvas);
        });

        return () => unsubscribe();
    }, [images, isLoading, scrollProgress]);

    // Handle canvas resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Redraw current frame
            if (images.length > 0 && images[currentFrameRef.current]) {
                const ctx = canvas.getContext('2d');
                const img = images[currentFrameRef.current];

                if (img.complete && img.naturalWidth > 0) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const imgAspect = img.naturalWidth / img.naturalHeight;
                    const canvasAspect = canvas.width / canvas.height;

                    let drawWidth, drawHeight, drawX, drawY;

                    if (imgAspect > canvasAspect) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgAspect;
                        drawX = 0;
                        drawY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawHeight = canvas.height;
                        drawWidth = canvas.height * imgAspect;
                        drawX = (canvas.width - drawWidth) / 2;
                        drawY = 0;
                    }

                    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
                }
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, [images]);

    return (
        <div className="frame-scroll-container" ref={ref}>
            <div className="frame-scroll-sticky">
                {isLoading && (
                    <div className="frame-loading">
                        <div className="frame-loading-bar">
                            <motion.div
                                className="frame-loading-progress"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <span className="frame-loading-text">Loading experience... {loadProgress}%</span>
                    </div>
                )}

                <canvas ref={canvasRef} className="frame-canvas" />

                {/* Text overlays - children passed through */}
                {children}
            </div>
        </div>
    );
});

FrameScrollAnimation.displayName = 'FrameScrollAnimation';

export default FrameScrollAnimation;
