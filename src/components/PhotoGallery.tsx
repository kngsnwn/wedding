import { useRef, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './PhotoGallery.scss';

interface ImageType {
  id: number;
  url: string;
  alt: string;
  title: string;
}

// Sample wedding images for demonstration - 32 images (4 rows x 8 columns)
const sampleImages: ImageType[] = Array.from({ length: 32 }, (_, i) => {
  const imageNumber = i + 1;
  return {
    id: imageNumber,
    url: `https://picsum.photos/400/600?random=${imageNumber}`,
    alt: `Wedding photo ${imageNumber}`,
    title: `Our Memory #${imageNumber}`
  };
});

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to get optimized image URL for thumbnails
  const getOptimizedImageUrl = (url: string) => {
    if (url.includes('picsum.photos')) {
      return url.replace('/400/500', '/240/300'); // 60% of original size
    }
    return url;
  };

  // Function to get full quality image URL for modal
  const getFullQualityImageUrl = (url: string) => {
    if (url.includes('picsum.photos')) {
      return url.replace('/240/300', '/800/1000'); // High quality for modal
    }
    return url;
  };

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Handle window resize for responsive positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close modal when clicking outside the image or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'placeholder.jpg';
  };

  const calculatePosition = (index: number) => {
    // Get responsive item size based on window width
    const getItemSize = () => {
      if (windowWidth <= 480) {
        return 90;
      } else if (windowWidth <= 768) {
        return 110;
      }
      return 137.097;
    };

    const itemSize = getItemSize();
    const row = Math.floor(index / 8);
    const col = index % 8;
    
    return {
      top: row * itemSize,
      left: col * itemSize,
      width: itemSize,
      height: itemSize
    };
  };

  return (
    <div className="photo-gallery">
      <h2>Our Moments</h2>
      <div className="gallery-container">
        <div className="gallery-wrapper">
          <div className="gallery-grid-absolute">
            {sampleImages.map((item, index) => {
              const position = calculatePosition(index);
              return (
                <div 
                  key={item.id} 
                  className="gallery-item absolute"
                  style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    width: `${position.width}px`,
                    height: `${position.height}px`
                  }}
                  onClick={() => handleImageClick(item)}
                >
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    draggable={false}
                    className="select-none pointer-events-auto callout"
                    onClick={(e) => {
                      e.preventDefault();
                      handleImageClick(item);
                    }}
                  >
                    <img 
                      src={getOptimizedImageUrl(item.url)}
                      alt={item.alt}
                      width="300"
                      draggable={false}
                      loading="lazy"
                      onError={handleImageError}
                      className="bg-full w-full h-full object-cover block cursor-pointer gallery-item-img rounded-md select-none pointer-events-none"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div className="image-modal">
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              className="enlarged-image"
              onError={handleImageError}
            />
            <div className="image-caption">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;