import { FacultySummary } from './faculty-summary';

export type DepartmentSummary = {
  id: string;
  displayId?: string | null;
  name: string;
  faculty: FacultySummary | null;
};
