const sanitizeFilename = (filename) => {
    if(!filename) return "Download";

    const name = filename.split(/[\\/]/).pop()

    const safeName = name
        .normalize("NFKD")
        .replace(/[^\w.-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return safeName || "download";
    
};

export default sanitizeFilename