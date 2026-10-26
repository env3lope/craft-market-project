import PropTypes from 'prop-types'
import './ReviewItem.css'

function ReviewItem({ name, rating, reviewText }) {
  return (
    <div className="reviews-container">
      <div className="review">
        <div className="review__reviewer-name">
          <p>{name}</p>
        </div>
        <div className="review__rating">
          <p>Оцінка: {rating}</p>
        </div>
        <div className="review__review-text">
          <p>Текст відгуку: {reviewText}</p>
        </div>
      </div>
    </div>
  )
}

ReviewItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewText: PropTypes.string.isRequired,
}

export default ReviewItem
