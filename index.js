export default async function handler(req, res) {
    const cloudName = "dzldts0zx";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=hero-images/`;

    const response = await fetch(url);
    const data = await response.json();

    const images = data.resources.map((img) => img.secure_url);

    res.status(200).json({ images });
}