import { useEffect, useState } from 'react';
import { useAuth } from '../../../../shared/context/auth/authContext';
import type { Relation } from '../../../../shared/infra/services/relation/interface';
import { getAllRelationsByUser } from '../../../../shared/infra/services/relation/relationService';

export const RelationPage = () => {
  const { user } = useAuth();
  const [relations, setRelations] = useState<Relation[]>([]);
  useEffect(() => {
    const userId = Number.parseInt(user!.id);
    getAllRelationsByUser(userId).then((relations) => {
      setRelations(relations.relations);
    });
  }, [user]);

  return (
    <div>
      {relations.map((relation) => (
        <h1>{relation.ToProfileName}</h1>
      ))}
    </div>
  );
};
