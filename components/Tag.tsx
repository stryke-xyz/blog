import Link from 'next/link';

import kebabCase from 'lib/utils/kebabCase';

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-2 text-sm font-medium uppercase text-primary dark:text-wave-blue hover:underline">
        {text.split(' ').join('-')}
      </a>
    </Link>
  );
};

export default Tag;
