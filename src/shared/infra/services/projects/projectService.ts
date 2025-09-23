import { api } from "../../api"
import type { ProjectResponse } from "./interface"

export const getProjectsByDevProfileId = async (devProfileId: string, page: number, size: number) => {
    try {
        const { data } = await api.get<ProjectResponse>(`/v1/projects/dev-profile/${devProfileId}`, {
            params: { page, size },
        })
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}
