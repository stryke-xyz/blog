import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ src, ...rest }) => <NextImage src={src} {...rest} />

export default Image
