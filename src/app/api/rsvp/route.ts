import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rsvpSchema } from '@/lib/types';

export async function POST(request: Request) {
  const supabase = await createClient();

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }
  
  const validated = rsvpSchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { message: 'Invalid form data.', errors: validated.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    inviteCode,
    firstName,
    lastName,
    email,
    phone,
    attendance,
    guestCount,
    dietary,
    message,
    gift_preference,
    relationship_to_couple,
    adult_count,
    child_count,
  } = validated.data;

  if (!inviteCode) {
    return NextResponse.json({ message: 'Invite code is required for submission.' }, { status: 400 });
  }

  try {
    // 1. Find the invitation using the invite code
    const { data: invitation, error: inviteError } = await supabase
      .from('invitations')
      .select('id, rsvp_deadline, allowed_guests')
      .eq('id', inviteCode)
      .single();

    if (inviteError || !invitation) {
      return NextResponse.json({ message: 'Invalid invitation code.' }, { status: 404 });
    }

    // Check 1: Validate RSVP deadline
    const now = new Date();
    const deadline = new Date(invitation.rsvp_deadline);

    if (now > deadline) {
      return NextResponse.json({ message: 'The deadline to RSVP for this event has passed.' }, { status: 403 });
    }

    // Check 2: Validate guest count against the invitation's allowance
    if (attendance === 'yes') {
      // This check satisfies TypeScript, although our Zod schema already ensures guestCount is present.
      if (guestCount === undefined) {
        return NextResponse.json({ message: 'Guest count is required when attending.' }, { status: 400 });
      }

      if (guestCount > invitation.allowed_guests) {
        return NextResponse.json(
          {
            message: `Your invitation allows for a maximum of ${invitation.allowed_guests} guest(s). Please adjust your guest count.`,
          },
          { status: 403 }
        );
      }
    }

    // 2. Create the RSVP entry
    const { error: rsvpError } = await supabase.from('rsvps').insert({
      invitation_id: invitation.id,
      name: `${firstName} ${lastName}`.trim(),
      email: email,
      phone: phone,
      attending: attendance === 'yes',
      guest_count: attendance === 'yes' ? (guestCount ?? 1) : 0,
      adult_count: attendance === 'yes' ? (adult_count ?? 1) : 0,
      child_count: attendance === 'yes' ? (child_count ?? 0) : 0,
      dietary_restrictions: dietary,
      message: message,
      gift_preference: gift_preference,
      relationship_to_couple: relationship_to_couple,
    });

    if (rsvpError) {
      console.error('Supabase RSVP insert error:', rsvpError);
      // Check for unique constraint violation (already RSVP'd)
      if (rsvpError.code === '23505') {
        return NextResponse.json(
          { message: 'An RSVP has already been submitted for this invitation.' },
          { status: 409 } // 409 Conflict
        );
      }
      return NextResponse.json({ message: 'Failed to save RSVP to the database.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'RSVP submitted successfully!' }, { status: 200 });

  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}