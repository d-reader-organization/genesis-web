import { GlobalStatusType } from '@/enums/globalStatusType'

export interface GlobalStatus {
	type: GlobalStatusType
	id: number
	message: string
}

export type CreateGlobalStatusData = Pick<GlobalStatus, 'type' | 'message'>
