import { ResultPromise } from "@/utils/result";

export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  imageUrl?: string;
}

export type ProjectList = Project;

export type GetProjectsBff = () => ResultPromise<ProjectList[]>