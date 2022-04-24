import React from 'react';
interface CustomImageProps {
  src: string | undefined;
  alt?: string | undefined;
}

const CustomImage: any = ({ src, alt }: CustomImageProps) => {
  return <img src={src} alt={alt || 'custom'} className="mx-auto" />;
};

export default CustomImage;
