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
  ToID: number;
  FromProfileName: string;
  ToProfileName: string;
  Type: 'FRIEND' | 'BLOCK';
  Status: string;
};

export type RelationsResponse = {
  Data: Relation[];
  Page: number;
  TotalItems: number;
  TotalPages: number;
  HasNext: boolean;
  HasPrevious: boolean;
};
