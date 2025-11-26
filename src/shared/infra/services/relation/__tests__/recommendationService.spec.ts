import { vi, type Mock } from 'vitest';
import { relationApi } from '../../../api';
import { getRecommendationsByProfile } from '../recommendationService';

vi.mock('../../../api', () => ({
  relationApi: {
    get: vi.fn(),
  },
}));

describe('recommendationService test', () => {
  describe('get recommendation by profile id', () => {
    it('should get recommendations by profile id', async () => {
      const mock = [
        {
          ID: 251,
          Name: 'Gustavo Lima',
          Score: 0.4,
          Stacks: ['java'],
        },
        {
          ID: 7,
          Name: 'Gustavo Lima',
          Score: 0,
          Stacks: ['javascript'],
        },
        {
          ID: 10,
          Name: 'Gustavo Lima',
          Score: 0,
          Stacks: ['java'],
        },
        {
          ID: 6,
          Name: 'Gustavo Lima',
          Score: 0,
          Stacks: ['python'],
        },
      ];
      const mockApiGet = relationApi.get as Mock;
      mockApiGet.mockResolvedValueOnce({ data: mock });
      const recommendations = await getRecommendationsByProfile(1);
      expect(recommendations[0].Name).toBe(mock[0].Name);
    });

    it('should throw exception when the backend returns a problem', async () => {
      const mockApiGet = relationApi.get as Mock;
      const error = new Error('error');
      mockApiGet.mockRejectedValueOnce(error);
      await expect(getRecommendationsByProfile(1)).rejects.toThrow(error);
    });
  });
});
