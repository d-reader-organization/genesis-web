export interface Wallet {
	address: string
	label: string
}

export type UpdateWalletData = Partial<Pick<Wallet, 'label'>>
