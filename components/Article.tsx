import React from 'react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import Box from '@mui/material/Box';

import formatDate from '@/lib/utils/formatDate';

import { H1, H2, H3, H4, H5, H6 } from '@/components/article-body/Header';
import Tag from '@/components/Tag';
import Anchor from '@/components/article-body/Anchor';
import UL from '@/components/article-body/UL';
import OL from '@/components/article-body/OL';
import LI from '@/components/article-body/LI';
import Code from '@/components/article-body/Code';
import Table from '@/components/article-body/Table';
import Blockquote from '@/components/article-body/Blockquote';
import Paragraph from '@/components/article-body/Paragraph';
import Typography from '@/components/UI/Typography';
import Image from '@/components/article-body/Image';

interface ArticleBodyProps {
  title: string;
  date: string;
  image: string;
  markdown: string;
  tag_list: string[];
  summary?: string;
  author?: any;
}

export default function ArticleBody({ title, date, image, markdown, tag_list }: ArticleBodyProps) {
  return (
    <Box className="space-y-4 mx-auto">
      <Box className="text-center space-y-4">
        <Typography variant="h6" className="text-end text-stieglitz font-semibod">
          {formatDate(date)}
        </Typography>
        <hr className="border-gray-300 dark:border-gray-700"></hr>
        <Typography variant="h1">{title}</Typography>
        {tag_list.map((tag, index) => (
          <Tag key={index} text={tag} />
        ))}
      </Box>
      <img src={image} className="mx-auto my-4" alt="cover" />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: H1! as any,
          h2: H2! as any,
          h3: H3! as any,
          h4: H4! as any,
          h5: H5! as any,
          h6: H6! as any,
          ul: UL,
          ol: OL,
          li: LI,
          code: Code,
          blockquote: Blockquote,
          table: Table,
          a: Anchor,
          p: Paragraph,
          img: Image,
        }}
      >
        {markdown}
      </ReactMarkdown>
      <hr className="border-gray-300 dark:border-gray-700 py-2" />
      <Link href={'/articles'} passHref>
        <a className="self-center xs:text-md lg:text-lg text-primary dark:text-wave-blue cursor-pointer">
          &larr; Back to Blog
        </a>
      </Link>
    </Box>
  );
}
