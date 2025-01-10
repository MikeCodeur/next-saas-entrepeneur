"use client"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import {UpdateUser, User} from "@/types/domain/user-types"

import {Input} from "@/app/components/ui/input"
import {FormSubmitClientButton as SubmitButton} from "@/app/components/forms/form-submit-button"
import {Switch} from "@/app/components/ui/switch"
import {editUserAction} from "./account-action"
import {toast} from "sonner"
import {updateUserFormSchema} from "@/app/components/forms/form-validators/user-form-schema"
import {useForm} from "react-hook-form"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"

type KeysUpdateUser = keyof UpdateUser
export function AccountForm(props: User & {uid: string}) {
  const router = useRouter()
  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name: props.name ?? "",
      email: props.email,
      image: props.image,
      id: props.id,
      visibility: props.visibility,
    },
  })

  async function onSubmit(data: UpdateUser) {
    const result = await editUserAction(data)
    if (!result) {
      return toast.success(
        "Compte mis à jour, veuillez vous reconnecter" as const
      )
    }
    if (result.errors) {
      for (const [key, value] of Object.entries(result.errors)) {
        form.setError(key as KeysUpdateUser, {message: value[0]})
      }
    }
    if (result.success) {
      toast.success(result.data)
    } else {
      toast.error(result.message)
    }

    router.refresh()
  }

  const onChangeVisibility = (visibility: boolean) => {
    form.setValue("visibility", visibility === true ? "public" : "private")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nom d&apos;utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                C&apos;est votre nom d&apos;utilisateur public.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tracker@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Email utilisé pour votre compte.
                <span className="flex flex-col text-sm text-muted-foreground">
                  *Si vous changer votre email, vous devez serez déconnecté.
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">Confidentialité</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="visibility"
              render={({field}) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Visibilité</FormLabel>
                    <FormDescription>
                      La visibilité de votre compte privé ou public.
                    </FormDescription>
                  </div>
                  <div className="flex flex-row justify-center space-x-4">
                    <span>
                      {field?.value?.toString() === "public"
                        ? "Public"
                        : "Privé"}
                    </span>
                    <FormControl>
                      <Switch
                        checked={field.value === "private" ? false : true}
                        onCheckedChange={onChangeVisibility}
                        aria-readonly
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <SubmitButton pending={form.formState.isSubmitting}>
          Mettre à jour
        </SubmitButton>
      </form>
    </Form>
  )
}
