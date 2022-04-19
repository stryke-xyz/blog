import slug from 'github-slugger';

const kebabCase = (str: string) => new slug().slug(str);

export default kebabCase;
