export interface Project {
  id: string;
  name: string;
  key: string;
  description?: string;
  imageUrl?: string;
}

export type ProjectListItem = Project;