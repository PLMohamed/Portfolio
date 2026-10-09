export interface ProjectRequest {
  title: string;
  description: string;
  image: File | null;
  previewLink: string | null;
  sourceLink: string | null;
  downloadLink: string | null;
  sortOrder: number;
  stack: string[];
}
