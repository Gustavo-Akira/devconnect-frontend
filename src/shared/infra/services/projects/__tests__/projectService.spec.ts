import { vi, type Mock } from "vitest";
import { api } from "../../../api";
import { getProjectsByDevProfileId } from "../projectService";

vi.mock('../../../api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('project', () => {
    it('should fetch projects by devprofile correctly', async () => {
        const mockApiGet = api.get as Mock;
        mockApiGet.mockResolvedValueOnce({ data: { 
                 content:[],
                  page: 0,
                  size: 5,
                  totalElements: 1,
                  totalPages: 1
         } });
        const result = await getProjectsByDevProfileId("1",0,5);
        expect(mockApiGet).toHaveBeenCalledWith(
        `/v1/projects/dev-profile/1`,
        { params: { page: 0, size: 5 } }
        );
        expect(result.page).toBe(0);
        expect(result.size).toBe(5);
        expect(result.totalElements).toBe(1);
        expect(result.totalPages).toBe(1);
    });

     it('should fetch projects by devprofile correctly', async () => {
        const mockApiGet = api.get as Mock;
        mockApiGet.mockRejectedValueOnce(new Error('Network Error'));
         expect(getProjectsByDevProfileId("1",0,5)).rejects.toThrow('Network Error');
        expect(mockApiGet).toHaveBeenCalledWith(
        `/v1/projects/dev-profile/1`,
        { params: { page: 0, size: 5 } }
        );
       
    });
});