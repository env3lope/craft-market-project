import { useForm } from 'react-hook-form'
import { promocodeSchema } from '../../schemas/promocodeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

function PromocodeForm({ applyPromo }) {
  const [promoError, setPromoError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(promocodeSchema),
    defaultValues: {
      promoCode: '',
    },
  })

  const onSubmit = async ({ promoCode }) => {
    setPromoError('')

    try {
      const result = await applyPromo(promoCode)

      if (result === false) {
        setPromoError('Невідомий промокод')
      }
    } catch {
      setPromoError('Не вдалося застосувати промокод')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="promoCode">Промокод</label>

      <input
        id="promoCode"
        type="text"
        placeholder="Наприклад, CRAFT10"
        autoComplete="off"
        {...register('promoCode')}
        onChange={(event) => {
          register('promoCode').onChange(event)
          setPromoError('')
        }}
      />

      {errors.promoCode && <p role="alert">{errors.promoCode.message}</p>}

      {promoError && <p role="alert">{promoError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Застосування...' : 'Застосувати'}
      </button>
    </form>
  )
}

export default PromocodeForm
