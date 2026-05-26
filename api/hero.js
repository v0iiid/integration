export default async function handler(req, res) {
    try {
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

        const url = `https://res.cloudinary.com/${cloudName}/image/list/hero.json`;

        const response = await fetch(url);
        const data = await response.json();

        const images = (data.resources || []).map((img) =>
            `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`
        );

        res.status(200).json({ images });
    } catch (err) {
        res.status(200).json({ images: [] });
    }
}