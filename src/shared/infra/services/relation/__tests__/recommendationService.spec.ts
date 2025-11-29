import { vi, type Mock } from 'vitest';
import { relationApi } from '../../../api';
import { getRecommendationsByProfile, requestFriendShip } from '../recommendationService';
import type { Relation } from '../interface';

vi.mock('../../../api', () => ({
  relationApi: {
    get: vi.fn(),
    post: vi.fn()
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

  describe("requestFriendShip",()=>{
    it('should create Relation Friendship with valid ids',async()=>{
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn: Relation = {
        relation:{
          FromId: fromId,
          TargetId: toId,
          RelationType: "FRIEND",
          Status: "PENDING"
        }
      };

      mockApiPost.mockResolvedValueOnce({data: validReturn});
      const returnedData = await requestFriendShip(fromId, toId)
      expect(returnedData).toBe(validReturn);
    });

    it('should thrown an error when post return an error', async()=>{
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn = new Error("error");

      mockApiPost.mockRejectedValueOnce(validReturn);
      await expect(requestFriendShip(fromId, toId)).rejects.toThrow(validReturn);
    });
  })
});
