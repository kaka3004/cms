export interface ICategoryImage {
  src: string;
  width: number;
  height: number;
  kind: "cover" | "main";
}

export interface ICategory {
  _id: any;
  title: string;
  slug: string;
  status: "disabled" | "enabled";
  description: string;
  images: ICategoryImage[];
  created_at: Date;
  updated_at: Date;
}
