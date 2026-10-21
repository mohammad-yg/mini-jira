import { successResult } from "@/utils/result";
import { SelectInitialProject } from "../types/dashboard-queries.type";

export const selectInitialProject: SelectInitialProject = (projects) => {
    return successResult(projects[0])
}