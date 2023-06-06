import React, { useEffect, useState } from 'react';

function Recommendation({ userId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (!userId) {
          console.error('User ID is missing');
          return;
        }

        // Fetch sailboat IDs from user document in the database
        const userResponse = await fetch(`http://localhost:5000/users/${userId}/favorites`);
        const userData = await userResponse.json();
        const favoriteSailboatIds = userData.favoriteSailboats.map((sailboat) => sailboat.id);

        // Fetch all sailboats from the database
        const sailboatsResponse = await fetch('http://localhost:5000/voiliers');
        const sailboatsData = await sailboatsResponse.json();

        // Filter sailboats based on name, type, and model
        const filteredRecommendations = sailboatsData.filter((sailboat) => {
          return (
            !favoriteSailboatIds.includes(sailboat.id) &&
            (sailboat.Nom && sailboat.Nom.toLowerCase().includes(userData.searchValue?.toLowerCase())) &&
            (sailboat.Type && sailboat.Type.toLowerCase().includes(userData.searchValue?.toLowerCase())) &&
            (sailboat.Modèle && sailboat.Modèle.toLowerCase().includes(userData.searchValue?.toLowerCase()))
          );
        });

        setRecommendations(filteredRecommendations);
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError(error.message);
        setIsPending(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommendations</h2>
      {error && <div className="error">{error}</div>}
      {isPending ? (
        <div>Loading...</div>
      ) : (
        recommendations.length > 0 ? (
          <ul>
            {recommendations.map((recommendation) => (
              <li key={recommendation.id}>{recommendation.name}</li>
            ))}
          </ul>
        ) : (
          <div>No recommendations available.</div>
        )
      )}
    </div>
  );
}

export default Recommendation;
