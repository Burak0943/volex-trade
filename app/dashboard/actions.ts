'use server'

import { revalidatePath } from 'next/cache'

export async function executeTrade(formData: FormData) {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
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

export async function closePosition(positionId: string, currentPrice: number) {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Get Position
    const { data: position } = await supabase
        .from('positions')
        .select('*')
        .eq('id', positionId)
        .single()

    if (!position) return { error: 'Position not found' }

    // 2. Calculate Profit
    let profit = 0
    if (position.type === 'BUY') {
        profit = (currentPrice - position.entry_price) * position.volume * 100 // Multiplier for demo
    } else {
        profit = (position.entry_price - currentPrice) * position.volume * 100
    }

    // 3. Update Position
    const { error: updatePosError } = await supabase
        .from('positions')
        .update({
            status: 'CLOSED',
            exit_price: currentPrice,
            profit: profit
        })
        .eq('id', positionId)

    if (updatePosError) return { error: 'Failed to close position' }

    // 4. Update Balance
    // First fetch current balance
    const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', user.id)
        .single()

    if (profile) {
        await supabase
            .from('profiles')
            .update({ balance: Number(profile.balance) + profit })
            .eq('id', user.id)
    }

    revalidatePath('/dashboard')
    return { success: true, message: `Closed for $${profit.toFixed(2)}` }
}
