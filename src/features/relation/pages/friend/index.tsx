import { useFriendsPage } from './hooks/useFriendsPage';

export const FriendsPage = () => {
  const { state } = useFriendsPage();
  return (
    <ul>
      {state.recommendations.map((recommendation) => (
        <li key={recommendation.ID}>
          {recommendation.Name} - {recommendation.Score}
        </li>
      ))}
    </ul>
  );
};
