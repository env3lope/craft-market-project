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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-lg flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2 className="text-xl font-semibold text-slate-800">Залишити відгук</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="authorName" className="text-sm font-medium text-slate-700">
          Ваше ім'я
        </label>
        <input
          id="authorName"
          type="text"
          {...register('authorName')}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
        {errors.authorName && (
          <p role="alert" className="text-sm text-red-600">
            {errors.authorName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rating" className="text-sm font-medium text-slate-700">
          Оцінка
        </label>
        <select
          id="rating"
          {...register('rating')}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        >
          <option value="" disabled>
            Оберіть оцінку
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.rating && (
          <p role="alert" className="text-sm text-red-600">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="reviewText" className="text-sm font-medium text-slate-700">
          Текст відгуку
        </label>
        <textarea
          id="reviewText"
          rows={4}
          {...register('reviewText')}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
        {errors.reviewText && (
          <p role="alert" className="text-sm text-red-600">
            {errors.reviewText.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-600 px-4 py-3 font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Надсилання...' : 'Залишити відгук'}
      </button>

      {isSubmitSuccessful && (
        <p role="status" className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
          Дякуємо за ваш відгук!
        </p>
      )}
    </form>
  )
}

export default ReviewForm
