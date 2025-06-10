# RSVP Backend Architecture Plan

This document outlines the plan for building a secure, invite-only RSVP system for Kuna and Kadeen's wedding website.

## 1. Core Technologies

- **Backend & Database**: Supabase (PostgreSQL, Auth, Edge Functions)
- **Frontend Framework**: Next.js
- **Data Validation**: `zod`
- **Email Notifications**: Resend (Chosen for its generous free tier)

## 2. System Architecture

The system is designed to be secure and automated, ensuring only invited guests can respond and that both guests and the couple are notified instantly.

### Part 1: Invite-Only Access Control

To prevent uninvited guests from RSVPing, we will implement a unique code system.

1.  **`invitations` Table**: A table will be created in the Supabase database named `invitations`. It will be pre-populated with the names of invited guests. Each guest/family will have a `unique_invite_code` (e.g., `a7d3f8c1`).
2.  **Magic Link**: The couple will send guests a personalized link, like: `https://kunas-wedding.com/rsvp?invite_code=a7d3f8c1`.
3.  **Verification**: The RSVP page will first check if the `invite_code` from the URL is valid by querying the `invitations` table. If the code is valid, the form is displayed. Otherwise, a polite message is shown.

### Part 2: Form Submission and Data Storage

Once a guest is verified, they can submit the RSVP form.

1.  **API Route**: A Next.js API route at `src/app/api/rsvp/route.ts` will handle form submissions (`POST` requests).
2.  **Server-Side Validation**: Inside the API route, `zod` will be used to validate the incoming data, ensuring it's correctly formatted and complete before it touches the database.
3.  **`rsvps` Table**: Validated data will be stored in a new table in Supabase called `rsvps`. This table will store all the details from the form and will be linked to the original `invite_code` to track who the submission belongs to.

### Part 3: Automated Email Notifications

Notifications will be triggered automatically upon successful submission.

1.  **Database Trigger**: A trigger will be set on the `rsvps` table in Supabase. This trigger will fire automatically whenever a new RSVP is successfully inserted.
2.  **Supabase Edge Function**: The trigger will invoke a serverless Edge Function.
3.  **The Function's Job**:
    -   **Notify the Guest**: It will use the Resend API to send a confirmation email to the guest (e.g., "We've received your RSVP!").
    -   **Notify the Couple**: It will immediately send a second email to Kuna and Kadeen, informing them of the new RSVP submission.

## 3. Implementation Steps

1.  **Setup Supabase**: Create a new project on Supabase.
2.  **Database Schema**: Define and create the `invitations` and `rsvps` tables.
3.  **API Route**: Build the `/api/rsvp` endpoint in Next.js, including `zod` validation.
4.  **Frontend Logic**: Implement the `invite_code` verification on the RSVP page.
5.  **Setup Resend**: Sign up for Resend, get an API key, and verify a sending domain.
6.  **Edge Function**: Write and deploy the Supabase Edge Function to handle email sending.
7.  **Database Trigger**: Connect the trigger to the Edge Function.
