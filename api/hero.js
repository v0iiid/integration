async function handler(req, res) {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Basic ${auth}`,
                },
                body: JSON.stringify({
                    expression: "tags=hero",
                    max_results: 30,
                }),
            }
        );

        const data = await response.json();

        if (data.error) {
            return res.status(400).json(data);
        }

        const images = (data.resources || []).map(
            (img) => img.secure_url
        );

        res.json({ images });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}