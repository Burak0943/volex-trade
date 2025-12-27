'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/trade')
}

export async function signup(formData: FormData) {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const username = formData.get('username') as string

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match.' }
    }

    // Check if username exists
    const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

    if (existingUser) {
        return { error: 'Username is already taken.' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/trade')
}

export async function resetPassword(formData: FormData) {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
    const email = formData.get('email') as string

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard/settings`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Password reset link sent to your email.' }
}

export async function signOut() {
    const { createSERVERClient } = await import('@/utils/supabase/server')
    const supabase = await createSERVERClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/login')
}
