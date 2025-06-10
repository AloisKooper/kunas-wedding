import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import RsvpClientPage from './RsvpClientPage';

interface RsvpPageProps {
  searchParams: {
    inviteCode?: string;
  };
}

export default async function RsvpPage({ searchParams }: RsvpPageProps) {
  const { inviteCode } = searchParams;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let guestName = 'Valued Guest';
  let validInviteCode: string | null = null;

  if (inviteCode) {
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('id, name')
      .eq('id', inviteCode)
      .single();

    if (!error && invitation) {
      guestName = invitation.name;
      validInviteCode = inviteCode;
    }
  }

  return <RsvpClientPage guestName={guestName} inviteCode={validInviteCode} />;
}