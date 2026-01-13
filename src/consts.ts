/* TODO: サイト基本情報を入力*/
/*サイトタイトル*/
export const SITE_TITLE = 'サイトのタイトル';

/*サイトディスクリプション*/
export const SITE_DESC =
  'サイトの共通ディスクリプションを記述してください。ページ別に異なるディスクリプションを設定する場合は、ページファイルのLayoutタグで上書きしてください';

/*ナビゲーション*/
const baseDir = import.meta.env.BASE_URL;
export const SITE_NAV = [
  {
    name: 'TOP',
    href: `${baseDir}`,
  },
  {
    name: 'ABOUT',
    href: '#about',
  },
  {
    name: 'NEWS',
    href: 'news',
  },
  {
    name: 'INFO',
    href: '#info',
  },
];
