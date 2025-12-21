import React from 'react';

interface FeedbackProps {
  rate: number;
  description: string;
  name: string;
}

const FeedbackCard: React.FC<FeedbackProps> = ({ rate, description, name }) => {
  // Логіка округлення рейтингу
  const roundRating = (rating: number) => {
    if (rating >= 3.3 && rating <= 3.7) return 3.5;
    if (rating >= 3.8 && rating <= 4.2) return 4;
    return Math.round(rating * 2) / 2;
  };

  const renderStars = (rating: number) => {
    const roundedRating = roundRating(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let iconId = 'icon-star';
      if (i <= roundedRating) {
        iconId = 'icon-star-filled';
      } else if (i - 0.5 === roundedRating) {
        iconId = 'icon-star_half';
      }

      stars.push(
        <svg key={i} className="star" width="23" height="23">
          <use href={`/icons/sprite.svg#${iconId}`}></use>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="feedback-card">
      <div className="star-rating">{renderStars(rate)}</div>
      <div className="feedback-text">{description}</div>
      <div className="feedback-author">{name}</div>
    </div>
  );
};

export default FeedbackCard;