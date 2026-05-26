export default async function handler(req, res) {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

        const url =
            `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=hero-images/`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();

        const images = (data.resources || []).map(img => img.secure_url);

        res.status(200).json({ images });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}