-- Create guestbook_messages table
CREATE TABLE public.guestbook_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rsvp_responses table
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'not-attending')),
  guest_count INTEGER DEFAULT 0,
  dietary_restrictions TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (wedding guests can view all messages)
CREATE POLICY "Anyone can view guestbook messages" 
ON public.guestbook_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create guestbook messages" 
ON public.guestbook_messages 
FOR INSERT 
WITH CHECK (true);

-- RSVP responses should be insertable by anyone but only viewable by wedding couple
CREATE POLICY "Anyone can create RSVP responses" 
ON public.rsvp_responses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "RSVP responses are private" 
ON public.rsvp_responses 
FOR SELECT 
USING (false); -- Only admins should view these

-- Create indexes for better performance
CREATE INDEX idx_guestbook_messages_created_at ON public.guestbook_messages(created_at DESC);
CREATE INDEX idx_rsvp_responses_created_at ON public.rsvp_responses(created_at DESC);