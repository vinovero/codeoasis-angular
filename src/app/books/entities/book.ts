export interface Book {
  bookId: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  purchased?:boolean;
  publisher: string;
}
