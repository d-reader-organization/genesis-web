import { Wallet } from '.'
import { User } from '../user'

export interface WalletIdentity {
	id?: User['id']
	avatar?: User['avatar']
	name?: User['name']
	address: Wallet['address']
	sns?: string
}
