export default async function handler(req, res) {
    const cloudName = "dzldts0zx";

    const url = `https://res.cloudinary.com/${cloudName}/image/list/hero-images.json`;

    const response = await fetch(url);
    const data = await response.json();

    const images = data.resources.map((img) =>
        `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.${img.format}`
    );

    res.status(200).json({ images });
}