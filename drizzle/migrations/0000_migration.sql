CREATE TABLE public.support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  message text NOT NULL,
  page text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','answered')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.support_messages TO service_role;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX support_messages_created_at_idx ON public.support_messages (created_at DESC);