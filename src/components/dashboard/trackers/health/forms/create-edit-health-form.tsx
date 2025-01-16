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
//import {createHealthAction, editHealthAction} from '../health-action'

import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {CalendarIcon} from 'lucide-react'
import {CreateEditHealth, Health} from '@/types/domain/health-types'
import {FormSubmitClientButton as FormSubmitButton} from '@/components/forms/form-submit-button'
import {Input} from '@/components/ui/input'
import {cn} from '@/lib/utils'
import {format} from 'date-fns'
import {fr} from 'date-fns/locale'

import {toast} from 'sonner'
import {useForm} from 'react-hook-form'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import {createEditHealthFormSchema} from '@/components/forms/form-validators/health-form-schema'
import {healthCategories} from '@/utils/constants'

type FormAddHealthProps = {
  data?: Health
  onClose: () => void
  uid?: string
}
const CreateEditHealthForm = (props: FormAddHealthProps) => {
  const router = useRouter()

  const isEdit = !!props.data
  const form = useForm<CreateEditHealth>({
    resolver: zodResolver(createEditHealthFormSchema),
    defaultValues: props.data ?? {
      date: new Date(),
      category: 'calories',
      value: 0,
      userId: props.uid,
    },
  })
  async function onSubmit(values: CreateEditHealth) {
    // const result = isEdit
    //   ? await editHealthAction(values)
    //   : await createHealthAction(values, props.uid)

    // if (!result) {
    //   toast.error(
    //     'Une erreur est survenue lors de la validation du formulaire' as const
    //   )
    //   return
    // }
    // if (result.errors) {
    //   for (const [key, value] of Object.entries(result.errors)) {
    //     form.setError(key as keyof CreateEditHealth, {message: value[0]})
    //   }
    // }
    // if (result.success) {
    //   toast.success(result.data)
    // } else {
    //   toast.error(result.message)
    //   return
    // }
    router.refresh()
    props.onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  {healthCategories.map((category) => (
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
              <FormDescription>
                Date de (l&apos;activité, pesé, calories consommées).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({field}) => (
            <FormItem>
              <FormLabel>Valeur</FormLabel>
              <FormControl>
                <Input placeholder="60" {...field} />
              </FormControl>
              <div className="text-sm text-muted-foreground">
                Valeur correpondant à la catégorie:{' '}
                <ul className="ml-4 list-disc">
                  <li>Calories en kcal</li>
                  <li>Poids en kg</li>
                  <li>Activité en min</li>
                </ul>
              </div>
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

export default CreateEditHealthForm
