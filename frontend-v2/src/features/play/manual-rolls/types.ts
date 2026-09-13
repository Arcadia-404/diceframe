export type ManualRollVisibility = 'party' | 'private'
export type ManualRollStatus = 'pending' | 'resolved' | 'cancelled'

export interface ManualRollResult {
  formula: string
  rolls: number[]
  modifier: number
  total: number
  natural: number | null
  rolled_by: string
  rolled_at: string
}

export interface ManualRollRequest {
  id: string
  operation_id: string
  run_id: string
  round_number: number
  created_by: string
  created_at: string
  label: string
  formula: string
  visibility: ManualRollVisibility
  target_uids: string[]
  target_names: Record<string, string>
  status: ManualRollStatus
  results: Record<string, ManualRollResult>
  cancel_reason?: string
}

export interface ManualRollRequestsResponse {
  ok: true
  run_id: string
  requests: ManualRollRequest[]
}
