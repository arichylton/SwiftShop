import { useEffect, useState } from 'react';
import { Rating } from 'semantic-ui-react';

function RatingIcons({ userRating, size }) {
  return (
    <div className='mt-1'>
      <Rating
        icon='star'
        maxRating={5}
        rating={userRating}
        disabled
        className={size}
      />
    </div>
  );
}

export default RatingIcons;
