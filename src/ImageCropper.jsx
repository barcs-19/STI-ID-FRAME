import { useState } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({ image, onCropComplete }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-64 h-64 bg-gray-200">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete} // ✅ send back crop pixels
      />
    </div>
  );
}
