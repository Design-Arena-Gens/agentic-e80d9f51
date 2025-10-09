'use client'

import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface Image {
  id: string;
  url: string;
}

const Moodboard: React.FC = () => {
  const [images, setImages] = React.useState<Image[]>([]);
  const [layout, setLayout] = React.useState<any[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: Image[] = [];
      const newLayout: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage = {
            id: `image-${images.length + i}-${Date.now()}`,
            url: reader.result as string,
          };
          newImages.push(newImage);

          const layoutItem = {
            i: newImage.id,
            x: (images.length + i) % 4,
            y: Math.floor((images.length + i) / 4),
            w: 1,
            h: 1,
          };
          newLayout.push(layoutItem);

          if (i === files.length - 1) {
            setImages([...images, ...newImages]);
            setLayout([...layout, ...newLayout]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 border rounded"
        />
      </div>
      <ReactGridLayout
        className="layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={4}
        rowHeight={200}
        isDraggable
        isResizable
      >
        {images.map((image) => (
          <div key={image.id} className="bg-gray-200 p-2 rounded overflow-hidden">
            <img src={image.url} alt="mood board image" className="w-full h-full object-cover" />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default Moodboard;
