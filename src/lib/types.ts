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
  adult_count: z.number().int().min(0).optional(),
  child_count: z.number().int().min(0).optional(),
  dietary: z.string().optional(),
  message: z.string().optional(),
  gift_preference: z.string().optional(),
  relationship_to_couple: z.string().optional(),
})
.refine(
  (data) => {
    if (data.attendance === 'yes') {
      // If attending, guestCount must be defined
      if (data.guestCount === undefined) return false;
      // adult_count and child_count must be defined
      if (data.adult_count === undefined || data.child_count === undefined) return false;
      // There must be at least one adult
      if (data.adult_count < 1) return false;
      // The sum must equal the total guest count
      return data.adult_count + data.child_count === data.guestCount;
    }
    return true; // If not attending, this validation doesn't apply
  },
  {
    message: 'The number of adults and children must add up to the total guest count, and there must be at least one adult.',
    path: ['adult_count'], // Where to show the error
  }
);

export type RsvpData = z.infer<typeof rsvpSchema>;
