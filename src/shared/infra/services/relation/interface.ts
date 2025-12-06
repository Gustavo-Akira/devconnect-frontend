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
  RelationType: 'FRIEND' | 'BLOCK';
};

export type Relation = {
  FromId: number;
  TargetId: number;
  FromProfileName: string;
  ToProfileName: string;
  RelationType: 'FRIEND' | 'BLOCK';
  Status: string;
};

export type RelationsResponse = {
  relations: Relation[];
};
