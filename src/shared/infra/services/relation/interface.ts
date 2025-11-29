export type Recommendations = {
  ID: number;
  Name: string;
  Score: number;
  City: string;
  Stacks: string[];
};

export type RelationRequest = {
  FromId: number;
  TargetId: number;
  RelationType: 'FRIEND' | 'BLOCKED';
};

export type Relation = {
  relation: {
    FromId: number;
    TargetId: number;
    RelationType: 'FRIEND' | 'BLOCKED';
    Status: string;
  };
};
