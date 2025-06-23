import './Gallery.scss';

// Gallery photos (commented out to prevent 404 errors)
const photos: string[] = []; 
/* [
  '/gallery1.jpg',
  '/gallery2.jpg',
  '/gallery3.jpg',
  '/gallery4.jpg',
  '/gallery5.jpg'
]; */

export default function Gallery() {
  return (
    <div className="gallery-section">
      <h2>사진첩</h2>
      <div className="gallery-grid">
        {photos.map((photo, index) => (
          <div key={index} className="gallery-item" data-index={index}>
            <img src={photo} alt={`wedding-${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
