import NextImage from 'next/image';

const Image = ({ src, ...rest }: any) => <NextImage src={src} {...rest} />;

export default Image;
