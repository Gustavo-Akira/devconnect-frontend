import { relationApi } from '../../api';
import type {
  Recommendations,
  Relation,
  RelationRequest,
  RelationsResponse,
} from './interface';

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

export const getAllRelationsByUser = async (id: number, page?: number) => {
  try {
    const { data } = await relationApi.get<RelationsResponse>(
      `/relation/${id}?page=${page ?? 0}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPendingRelationsByUser = async (id: number) => {
  try {
    const { data } = await relationApi.get<{ relations: Relation[] }>(
      `/relation/pending/${id}`,
    );
    return data.relations;
  } catch (error) {
    console.error(error);
    throw error;
  }
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

export const acceptRelationRequest = async (
  id: number,
  fromId: number,
): Promise<Relation> => {
  try {
    const { data } = await relationApi.patch<Relation>(
      `/relation/accept/${fromId}/${id}`,
      {},
    );
    return data;
  } catch (error) {
    console.error(
      'Error accepting relation request for user #%d from profile #%d',
      id,
      fromId,
    );
    throw error;
  }
};

export const getRelationByFromIdAndToId = async (
  fromId: number,
  toId: number,
): Promise<Relation> => {
  try {
    const { data } = await relationApi.get<Relation>(
      `/relation/${fromId}/to/${toId}`,
    );
    return data;
  } catch (error) {
    console.error(
      'Error getting relation from profile #%d to profile #%d',
      fromId,
      toId,
    );
    throw error;
  }
};
