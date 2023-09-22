import { useEffect, useState } from 'react';
import { Rating } from 'semantic-ui-react';

function RatingIcons({ userRating }) {
  return (
    <div>
      <Rating
        icon='star'
        maxRating={5}
        rating={userRating}
        disabled
      />
    </div>
  );
}

export default RatingIcons;
