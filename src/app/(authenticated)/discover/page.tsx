import { RoutePath } from '@/enums/routePath'
import { redirect } from 'next/navigation'

export default function DiscoverPage() {
  redirect(RoutePath.DiscoverComics)
}
