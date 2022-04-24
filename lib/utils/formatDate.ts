import { siteMetadata } from 'data/siteMetadata';

const formatDate = (date: string | number | Date) => {
  const options: Object = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options);

  return now;
};

export default formatDate;
