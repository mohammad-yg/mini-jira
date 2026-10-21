export type ProjectId = string;

export interface Project {
  id: ProjectId;
  name: string;
  key: string;
  description?: string;
  imageUrl?: string;
}

export type ProjectListItem = Project;