export type Languages = 'en' | 'zh';

export type CustomBlok = {
  [key: string]: string | number | CustomBlok;
};
