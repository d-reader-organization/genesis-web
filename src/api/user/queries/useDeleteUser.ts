import { onQueryError, toast } from '@/components/ui/toast/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { deleteUser } from '@/app/lib/api/user/mutations'

export const useDeleteUser = (slug: string) => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: () => deleteUser(slug),
    onSuccess: () => {
      toast({
        description: 'Account deleted!',
        variant: 'success',
      })
      refresh()
    },
    throwOnError: onQueryError,
  })
}
