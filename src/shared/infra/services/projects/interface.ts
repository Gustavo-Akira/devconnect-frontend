export type Project = {
  id: string;
  name: string;
  description: string;
  repoUrl: string;
  owner: Owner;
};

export type Owner = {
  id: string;
  name: string;
};

export interface ProjectResponse {
  content: Project[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
