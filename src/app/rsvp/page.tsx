import { createClient } from '@/lib/supabase/server';
import RsvpClientPage from './RsvpClientPage';

export default async function RsvpPage({
  searchParams,
}: {
  // As per Next.js 15, searchParams in async pages is a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams promise to resolve
  const resolvedSearchParams = await searchParams;
  const inviteCodeParam = resolvedSearchParams?.inviteCode;
  const inviteCode = Array.isArray(inviteCodeParam) ? inviteCodeParam[0] : inviteCodeParam;
  const supabase = await createClient();

  let guestName = 'Valued Guest';
  let validInviteCode: string | null = null;
  let allowedGuests = 1;
  let deadlinePassed = false;

  if (inviteCode) {
    try {
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
    } catch (error) {
      console.error('Error fetching invitation:', error);
      // Continue with default values if there's an error
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