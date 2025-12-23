'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function executeTrade(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const symbol = formData.get('symbol') as string
    const type = formData.get('type') as string
    const volume = parseFloat(formData.get('volume') as string)
    const entryPrice = parseFloat(formData.get('price') as string)

    const { error } = await supabase
        .from('positions')
        .insert({
            user_id: user.id,
            symbol,
            type,
            volume,
            entry_price: entryPrice,
            status: 'OPEN'
        })

    if (error) {
        console.error('Trade error:', error)
        return { error: 'Failed to execute trade' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
