import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import RsvpClientPage from './RsvpClientPage';

export default async function RsvpPage({ 
  searchParams 
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const inviteCodeParam = searchParams?.inviteCode;
  const inviteCode = Array.isArray(inviteCodeParam) ? inviteCodeParam[0] : inviteCodeParam;
  const supabase = createClient();

  let guestName = 'Valued Guest';
  let validInviteCode: string | null = null;
  let allowedGuests = 1;
  let deadlinePassed = false;

  if (inviteCode) {
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('id, name, rsvp_deadline, allowed_guests')
      .eq('id', inviteCode)
      .single();

    if (!error && invitation) {
      const now = new Date();
      const deadline = new Date(invitation.rsvp_deadline);

      if (now > deadline) {
        deadlinePassed = true;
      } else {
        guestName = invitation.name;
        validInviteCode = inviteCode;
        allowedGuests = invitation.allowed_guests ?? 1;
      }
    }
  }

  // Always render the client page, passing the status of the invite.
  // The client page will then decide what to show (form, disabled form, or deadline message).
  return (
    <RsvpClientPage
      guestName={guestName}
      inviteCode={validInviteCode}
      allowedGuests={allowedGuests}
      deadlinePassed={deadlinePassed}
    />
  );
}