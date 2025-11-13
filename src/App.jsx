import React, { useState, useEffect } from "react";

/**
 * App.jsx
 * Simple gallery app for /src/App.jsx
 * - drag & drop or click to upload images
 * - preview thumbnails
 * - click to open lightbox
 * - remove image
 *
 * Usage: drop this file into src/ and run your React app (Create React App or Vite).
 */

export default function App() {
    const [images, setImages] = useState([]); // { id, src, name }
    const [dragOver, setDragOver] = useState(false);
    const [lightbox, setLightbox] = useState(null);

    // cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img._objectUrl) URL.revokeObjectURL(img._objectUrl);
            });
        };
    }, [images]);

    const addFiles = (files) => {
        const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
        if (!fileArray.length) return;
        const newImages = fileArray.map((file) => {
            const obj = URL.createObjectURL(file);
            return {
                id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                src: obj,
                name: file.name,
                _objectUrl: obj,
            };
        });
        setImages((prev) => [...newImages, ...prev]);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer?.files?.length) {
            addFiles(e.dataTransfer.files);
        }
    };

    const onFileInput = (e) => {
        if (e.target.files?.length) addFiles(e.target.files);
        e.target.value = "";
    };

    const removeImage = (id) => {
        setImages((prev) => {
            const toRemove = prev.find((p) => p.id === id);
            if (toRemove && toRemove._objectUrl) {
                URL.revokeObjectURL(toRemove._objectUrl);
            }
            return prev.filter((p) => p.id !== id);
        });
        if (lightbox === id) setLightbox(null);
    };

    const sampleFetch = async () => {
        // fetch a few sample images from unsplash source (no API key)
        // gracefully ignore failures
        try {
            const urls = [
                "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
            ];
            const newImages = urls.map((u, i) => ({
                id: `sample-${Date.now()}-${i}`,
                src: u,
                name: `sample-${i + 1}`,
            }));
            setImages((prev) => [...newImages, ...prev]);
        } catch (err) {
            // ignore
        }
    };

    const styles = {
        app: {
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            minHeight: "100vh",
            background: "#0f172a",
            color: "#e6eef8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 24,
            boxSizing: "border-box",
        },
        header: { maxWidth: 900, width: "100%", marginBottom: 16 },
        title: { fontSize: 22, margin: 0, fontWeight: 700 },
        subtitle: { margin: "6px 0 16px", color: "#9fb0d6" },
        drop: {
            width: "100%",
            borderRadius: 12,
            padding: 20,
            border: `2px dashed ${dragOver ? "#60a5fa" : "#334155"}`,
            background: dragOver ? "linear-gradient(90deg,#062e56, #08325f)" : "#071123",
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            cursor: "pointer",
        },
        dropLeft: { display: "flex", gap: 12, alignItems: "center" },
        dropIcon: {
            width: 56,
            height: 56,
            borderRadius: 8,
            background:
                "linear-gradient(180deg, rgba(96,165,250,0.12), rgba(56,189,248,0.06))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#60a5fa",
            fontWeight: 700,
            fontSize: 20,
        },
        actions: { display: "flex", gap: 8, alignItems: "center" },
        btn: {
            background: "#0b1220",
            color: "#cfe8ff",
            border: "1px solid #1e293b",
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 14,
        },
        grid: {
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            width: "100%",
            maxWidth: 900,
        },
        thumb: {
            position: "relative",
            borderRadius: 10,
            overflow: "hidden",
            background: "#041226",
            border: "1px solid rgba(255,255,255,0.04)",
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        thumbImg: { width: "100%", height: 140, objectFit: "cover", display: "block" },
        thumbFooter: {
            position: "absolute",
            bottom: 6,
            left: 6,
            right: 6,
            display: "flex",
            justifyContent: "space-between",
            gap: 6,
            alignItems: "center",
        },
        smallBtn: {
            background: "rgba(2,6,23,0.6)",
            color: "#dbeafe",
            border: "1px solid rgba(255,255,255,0.04)",
            padding: "6px 8px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
        },
        lightbox: {
            position: "fixed",
            inset: 0,
            background: "rgba(2,6,23,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
        },
        lightboxImg: { maxWidth: "96%", maxHeight: "86%", borderRadius: 10 },
    };

    return (
        <div style={styles.app}>
            <div style={styles.header}>
                <h1 style={styles.title}>YourArt — Quick Gallery</h1>
                <p style={styles.subtitle}>
                    Upload images (drag & drop or click). Click a thumbnail to view. This is a lightweight starter App.jsx.
                </p>
            </div>

            <div
                style={styles.drop}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => document.getElementById("file-input")?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") document.getElementById("file-input")?.click();
                }}
            >
                <div style={styles.dropLeft}>
                    <div style={styles.dropIcon}>+</div>
                    <div>
                        <div style={{ fontWeight: 600 }}>Add your art</div>
                        <div style={{ fontSize: 13, color: "#9fb0d6" }}>
                            Drag & drop images here, or click to choose files
                        </div>
                    </div>
                </div>

                <div style={styles.actions}>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onFileInput}
                        style={{ display: "none" }}
                    />
                    <button
                        type="button"
                        style={styles.btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById("file-input")?.click();
                        }}
                    >
                        Choose files
                    </button>
                    <button
                        type="button"
                        style={styles.btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            sampleFetch();
                        }}
                    >
                        Load samples
                    </button>
                </div>
            </div>

            <div style={styles.grid}>
                {images.length === 0 && (
                    <div style={{ color: "#9fb0d6", padding: 18 }}>No images yet — add some to begin.</div>
                )}
                {images.map((img) => (
                    <div key={img.id} style={styles.thumb}>
                        <img
                            src={img.src}
                            alt={img.name}
                            style={styles.thumbImg}
                            onClick={() => setLightbox(img.id)}
                        />
                        <div style={styles.thumbFooter}>
                            <div style={{ fontSize: 12, color: "#cfe8ff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {img.name}
                            </div>
                            <div style={{ display: "flex", gap: 6 }}>
                                <button
                                    type="button"
                                    style={styles.smallBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightbox(img.id);
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    style={styles.smallBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage(img.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {lightbox && (
                <div
                    style={styles.lightbox}
                    onClick={() => setLightbox(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <img
                        src={images.find((i) => i.id === lightbox)?.src}
                        alt=""
                        style={styles.lightboxImg}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}