import { useEffect, useState } from 'react';
import { Rating } from 'semantic-ui-react';

function RatingIcons({ userRating }) {
  const [rating, setRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);

  useEffect(() => {
    setRating(userRating);
  }, []);

  const handleRate = (e, { rating, maxRating }) => {
    setMaxRating(maxRating);
    setRating(rating);
  };

  return (
    <div>
      <Rating
        icon='star'
        maxRating={5}
        rating={rating}
        onRate={handleRate}
        disabled
      />
    </div>
  );
}

export default RatingIcons;
