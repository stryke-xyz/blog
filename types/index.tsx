export type Languages = 'en' | 'zh' | 'vi';

export type CustomBlok = {
  [key: string]: string | number | CustomBlok;
};
