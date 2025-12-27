import { vi, type Mock } from 'vitest';
import { relationApi } from '../../../api';
import {
  acceptRelationRequest,
  blockUser,
  getAllPendingRelationsByUser,
  getAllRelationsByUser,
  getRecommendationsByProfile,
  requestFriendShip,
} from '../relationService';
import type { Relation, RelationsResponse } from '../interface';

vi.mock('../../../api', () => ({
  relationApi: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
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

  describe('requestFriendShip', () => {
    it('should create Relation Friendship with valid ids', async () => {
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn: RelationsResponse = {
        Data: [
          {
            FromId: fromId,
            TargetId: toId,
            Type: 'FRIEND',
            Status: 'PENDING',
            FromProfileName: 'akira',
            ToProfileName: 'kira',
          },
        ],
        HasNext: false,
        HasPrevious: false,
        Page: 1,
        TotalItems: 1,
        TotalPages: 1,
      };

      mockApiPost.mockResolvedValueOnce({ data: validReturn });
      const returnedData = await requestFriendShip(fromId, toId);
      expect(returnedData).toBe(validReturn);
    });

    it('should thrown an error when post return an error', async () => {
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn = new Error('error');

      mockApiPost.mockRejectedValueOnce(validReturn);
      await expect(requestFriendShip(fromId, toId)).rejects.toThrow(
        validReturn,
      );
    });
  });

  describe('blockUser', () => {
    it('should create Relation Friendship with valid ids', async () => {
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn: Relation = {
        FromId: fromId,
        TargetId: toId,
        Type: 'BLOCK',
        FromProfileName: 'akira',
        ToProfileName: 'kira',
        Status: 'ACCEPTED',
      };

      mockApiPost.mockResolvedValueOnce({ data: validReturn });
      const returnedData = await blockUser(fromId, toId);
      expect(returnedData).toBe(validReturn);
    });

    it('should thrown an error when post return an error', async () => {
      const fromId: number = 1;
      const toId: number = 2;
      const mockApiPost = relationApi.post as Mock;
      const validReturn = new Error('error');

      mockApiPost.mockRejectedValueOnce(validReturn);
      await expect(blockUser(fromId, toId)).rejects.toThrow(validReturn);
    });
  });
  describe('getRelationsByUser', () => {
    it('should get Relaitons by user', async () => {
      const id = 1;
      const mockApiGet = relationApi.get as Mock;
      const validReturn = [
        {
          relation: {
            FromId: id,
            TargetId: 25,
            RelationType: 'BLOCK',
            Status: 'ACCEPTED',
          },
        },
      ];
      mockApiGet.mockResolvedValueOnce({ data: validReturn });

      const result = await getAllRelationsByUser(id);
      expect(result).toBe(validReturn);
    });

    it('should throw error', async () => {
      const id = 1;
      const mockApiGet = relationApi.get as Mock;
      const validReturn = new Error('error');
      mockApiGet.mockRejectedValueOnce(validReturn);

      await expect(getAllRelationsByUser(id)).rejects.toThrow(validReturn);
    });
  });

  describe('getAllPendingRelationsByUser', () => {
    it('should get pending relations by user', async () => {
      const id = 1;
      const mockRelations: Relation[] = [
        {
          FromId: 2,
          TargetId: id,
          Type: 'FRIEND',
          Status: 'PENDING',
          FromProfileName: 'user2',
          ToProfileName: 'user1',
        },
      ];
      const mockApiGet = relationApi.get as Mock;
      mockApiGet.mockResolvedValueOnce({ data: { relations: mockRelations } });

      const result = await getAllPendingRelationsByUser(id);
      expect(result).toBe(mockRelations);
    });

    it('should throw error', async () => {
      const id = 1;
      const mockApiGet = relationApi.get as Mock;
      const error = new Error('error');
      mockApiGet.mockRejectedValueOnce(error);

      await expect(getAllPendingRelationsByUser(id)).rejects.toThrow(error);
    });
  });

  describe('acceptRelationRequest', () => {
    it('should accept relation request', async () => {
      const id = 1;
      const fromId = 2;
      const mockRelation: Relation = {
        FromId: fromId,
        TargetId: id,
        Type: 'FRIEND',
        Status: 'ACCEPTED',
        FromProfileName: 'user2',
        ToProfileName: 'user1',
      };
      const mockApiPatch = relationApi.patch as Mock;
      mockApiPatch.mockResolvedValueOnce({ data: mockRelation });

      const result = await acceptRelationRequest(id, fromId);
      expect(result).toBe(mockRelation);
    });

    it('should throw error when put returns an error', async () => {
      const id = 1;
      const fromId = 2;
      const mockApiPatch = relationApi.patch as Mock;
      const error = new Error('error');
      mockApiPatch.mockRejectedValueOnce(error);

      await expect(acceptRelationRequest(id, fromId)).rejects.toThrow(error);
    });
  });

  describe('get relation by from id and to id', () => {
    it('should get relation by from id and to id', async () => {
      const fromId = 1;
      const toId = 2;
      const mockRelation: Relation = {
        FromId: fromId,
        TargetId: toId,
        Type: 'FRIEND',
        Status: 'ACCEPTED',
        FromProfileName: 'user1',
        ToProfileName: 'user2',
      };
      const mockApiGet = relationApi.get as Mock;
      mockApiGet.mockResolvedValueOnce({ data: mockRelation });

      const result = await getAllRelationsByUser(fromId, toId);
      expect(result).toBe(mockRelation);
    });

    it('should throw error when get returns an error', async () => {
      const fromId = 1;
      const toId = 2;
      const mockApiGet = relationApi.get as Mock;
      const error = new Error('error');
      mockApiGet.mockRejectedValueOnce(error);

      await expect(getAllRelationsByUser(fromId, toId)).rejects.toThrow(error);
    });
  });
});
