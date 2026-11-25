-- Fix missing UNIQUE constraint on consultation_availability (professional_id, weekday)
-- Safe and idempotent: deduplicates any existing duplicate weekday rows first.

DELETE FROM public.consultation_availability a
USING public.consultation_availability b
WHERE a.ctid > b.ctid
  AND a.professional_id = b.professional_id
  AND a.weekday = b.weekday;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'consultation_availability_prof_weekday_key'
  ) THEN
    ALTER TABLE public.consultation_availability
      ADD CONSTRAINT consultation_availability_prof_weekday_key
      UNIQUE (professional_id, weekday);
  END IF;
END $$;
