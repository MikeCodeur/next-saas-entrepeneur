'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
//import {createFinanceAction, editFinanceAction} from '../finance-action'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {CalendarIcon} from 'lucide-react'
import {CreateEditFinance, Finance} from '@/types/domain/finance-types'
import {FormSubmitClientButton as FormSubmitButton} from '@/components/forms/form-submit-button'
import {Input} from '@/components/ui/input'
import {cn} from '@/lib/utils'

import {format} from 'date-fns'
import {fr} from 'date-fns/locale'
import {financeCategories} from '@/utils/constants'
import {toast} from 'sonner'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import {createEditFinanceFormSchema as createEditFinanceFormSchema} from '@/components/forms/form-validators/finance-form-schema'
import {createFinanceAction, editFinanceAction} from './finance-action'

type CreateEditFinanceFormProps = {
  data?: Finance
  onClose: () => void
  uid?: string
}

const CreateEditFinanceForm = (props: CreateEditFinanceFormProps) => {
  const router = useRouter()

  const isEdit = !!props.data

  const form = useForm<CreateEditFinance>({
    resolver: zodResolver(createEditFinanceFormSchema),
    defaultValues: props.data ?? {
      date: new Date(),
      amount: 0,
      category: 'revenus',
      label: '',
      userId: props.uid,
    },
  })
  const {
    formState: {errors},
  } = form
  console.log('errors', errors)

  async function onSubmit(values: CreateEditFinance) {
    console.log('onSubmit', values)

    const result = isEdit
      ? await editFinanceAction(values)
      : await createFinanceAction(values)

    if (!result) {
      toast.error(
        'Une erreur est survenue lors de la validation du formulaire' as const
      )
      return
    }
    if (result.errors) {
      for (const [key, value] of Object.entries(result.errors)) {
        form.setError(key as keyof CreateEditFinance, {
          // message: value[0],
        })
      }
    }
    if (result.success) {
      toast.success(result.data)
    } else {
      toast.error(result.message)
      return
    }
    router.refresh()
    props.onClose()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="category"
          render={({field}) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {financeCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({field}) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd-MM-yyy')
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Date de la transaction.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({field}) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <Input placeholder="100" {...field} />
              </FormControl>
              <FormDescription>Montant en euros.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({field}) => (
            <FormItem>
              <FormLabel>Libéllé</FormLabel>
              <FormControl>
                <Input placeholder="Achat / Dépense" {...field} />
              </FormControl>
              <FormDescription>Le libellé.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row justify-end">
          <FormSubmitButton pending={form.formState.isSubmitting}>
            {isEdit ? 'Modifier' : 'Ajouter'}
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

export default CreateEditFinanceForm
