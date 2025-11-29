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

export const requestFriendShip = async(id:number,toId: number) => {
  try{
    const body: RelationRequest = {
      TargetId: toId,
      FromId: id,
      RelationType: "FRIEND"
    }
    const {data} = await relationApi.post<Relation>("/relation",body)
    return data
  }catch(error){
    console.error("Error creating relation #%d  with profile #%d ",id,toId)
    throw error
  }
}