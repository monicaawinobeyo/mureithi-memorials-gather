
-- Create a storage bucket for memorial images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('memorial_images', 'Memorial Images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up a policy to allow public access to view the images
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'memorial_images');

-- Allow anyone to upload images (since this is a public memorial site)
CREATE POLICY "Public Upload" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'memorial_images');
