import { relationApi } from '../../api';
import type { Recommendations, Relation, RelationRequest } from './interface';

export const getRecommendationsByProfile = async (id: number) => {
  try {
    const { data } = await relationApi.get<Recommendations[]>(
      `/recommendations/${id}`,
    );
    return data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const requestFriendShip = async (id: number, toId: number) => {
  return await createRelationRequest(id, toId, 'FRIEND');
};

export const blockUser = async (id: number, toId: number) => {
  return await createRelationRequest(id, toId, 'BLOCK');
};

const createRelationRequest = async (
  id: number,
  toId: number,
  relationType: 'FRIEND' | 'BLOCK',
): Promise<Relation> => {
  try {
    const body: RelationRequest = {
      TargetId: toId,
      FromId: id,
      RelationType: relationType,
    };
    const { data } = await relationApi.post<Relation>('/relation', body);
    return data;
  } catch (error) {
    console.error(
      'Error creating relation #%d  with profile #%d for relationship %s',
      id,
      toId,
      relationType,
    );
    throw error;
  }
};
