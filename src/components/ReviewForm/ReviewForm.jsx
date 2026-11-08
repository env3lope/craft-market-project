import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '../../schemas/reviewSchema'
import './ReviewForm.css'

function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      authorName: '',
      rating: '',
      reviewText: '',
    },
  })

  const onSubmit = (data) => {
    onReviewSubmit(data)
    reset()
  }

  const inputClasses =
    'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none transition focus:border-clay-600 focus:ring-2 focus:ring-clay-100'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-lg flex-col gap-6 rounded-card border border-line bg-white p-6 shadow-card"
    >
      <h2 className="font-display text-2xl font-bold text-clay-700">Залишити відгук</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="authorName" className="text-sm font-medium text-ink">
            Ваше ім'я
          </label>

          <input id="authorName" type="text" {...register('authorName')} className={inputClasses} />

          <p role="alert" className="min-h-5 text-sm text-red-700">
            {errors.authorName?.message || ''}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rating" className="text-sm font-medium text-ink">
            Оцінка
          </label>

          <select id="rating" {...register('rating')} className={inputClasses}>
            <option value="" disabled>
              Оберіть оцінку
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <p role="alert" className="min-h-5 text-sm text-red-700">
            {errors.rating?.message || ''}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="reviewText" className="text-sm font-medium text-ink">
          Текст відгуку
        </label>

        <textarea
          id="reviewText"
          rows={4}
          {...register('reviewText')}
          className={`${inputClasses} resize-y`}
        />

        <p role="alert" className="min-h-5 text-sm text-red-700">
          {errors.reviewText?.message || ''}
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-clay-600 px-4 py-3 font-medium text-white transition hover:bg-clay-700 focus:outline-none focus:ring-2 focus:ring-clay-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Надсилання...' : 'Залишити відгук'}
      </button>

      {isSubmitSuccessful && (
        <p
          role="status"
          className="rounded-lg border border-clay-100 bg-clay-50 p-3 text-sm text-clay-700"
        >
          Дякуємо за ваш відгук!
        </p>
      )}
    </form>
  )
}

export default ReviewForm
