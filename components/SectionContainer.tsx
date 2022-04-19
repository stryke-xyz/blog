import { ReactNode } from 'react';

interface SectionContainerProps {
  children: string | ReactNode | null;
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return <div className="max-w-3xl px-2 mx-auto sm:px-6 xl:max-w-5xl xl:px-0">{children}</div>;
}
