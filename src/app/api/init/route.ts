import { NextResponse } from 'next/server'
import { createTables } from '@/lib/supabase/schema'

export async function GET() {
  try {
    const { guestsError, eventsError } = await createTables()
    
    return NextResponse.json({ 
      message: 'Database initialization completed',
      guestsError,
      eventsError
    })
  } catch (error) {
    console.error('Initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database' }, 
      { status: 500 }
    )
  }
} 