import { z } from 'zod';

// Using lowercase 'rsvpSchema' for consistency
export const rsvpSchema = z.object({
  inviteCode: z.string().uuid('Invalid invitation code.').nullable(),
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  attendance: z.enum(['yes', 'no'], {
    required_error: 'Please select an attendance option.',
  }),
  guestCount: z.number().int().min(1).optional(),
  dietary: z.string().optional(),
  message: z.string().optional(),
  gift_preference: z.string().optional(),
  relationship_to_couple: z.string().optional(),
});

export type RsvpData = z.infer<typeof rsvpSchema>;
