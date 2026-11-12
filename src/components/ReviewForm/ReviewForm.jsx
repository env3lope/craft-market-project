import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema } from '../../schemas/reviewSchema'
import { Button, Input } from '../ui'

function ReviewForm({ onReviewSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
      className="flex w-full max-w-xl flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Ім'я"
          hint="Не менше 2 символів"
          autoComplete="given-name"
          error={errors.authorName?.message}
          {...register('authorName')}
        />

        <Input
          label="Оцінка"
          hint="Від 1 до 5"
          type="number"
          min={1}
          max={5}
          error={errors.rating?.message}
          {...register('rating', { valueAsNumber: true })}
        />
      </div>

      <Input
        as="textarea"
        rows={4}
        label="Текст відгуку"
        hint="Не менше 10 символів"
        error={errors.reviewText?.message}
        {...register('reviewText')}
      />

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Надсилання…' : 'Надіслати відгук'}
      </Button>
    </form>
  )
}

export default ReviewForm
