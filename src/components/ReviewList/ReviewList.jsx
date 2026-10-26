import PropTypes from 'prop-types'
import ReviewItem from '../ReviewItem/ReviewItem'
import './ReviewList.css'

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p className="empty-message">За заданими умовами пошуку відгуків не знайдено.</p>
  }

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          name={review.authorName}
          rating={review.rating}
          reviewText={review.reviewText}
        />
      ))}
    </div>
  )
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviewText: PropTypes.string.isRequired,
    })
  ),
}

export default ReviewList
