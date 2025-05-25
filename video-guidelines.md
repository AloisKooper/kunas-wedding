# Video Implementation Guidelines

## Current Video Implementation

The current implementation uses a high-quality Cloudinary video that loads efficiently and only plays when in the viewport. This approach provides an optimal balance between visual quality and performance.

## How to Add New Videos

When adding new videos to the Kalahari Axarob Tours website, follow these guidelines to ensure consistent quality and performance.

### Cloudinary URL Format

The current video uses this URL format:
```
https://res.cloudinary.com/dik2mqn3b/video/upload/q_auto:best,f_auto/scene_video_rozuws.mp4
```

This URL includes important optimization parameters:
- `q_auto:best` - Automatically selects the best quality level
- `f_auto` - Automatically delivers the most optimal format for the user's browser

### Steps to Add a New Video

1. **Upload your video to Cloudinary**
   - Login to your Cloudinary account
   - Upload your video to the appropriate folder
   - Recommended video specifications:
     - Resolution: 1920x1080 (HD) or 1280x720 (HD)
     - Format: MP4 (original upload)
     - Duration: 30-60 seconds for background videos
     - File size: Aim for under 10MB for optimal loading

2. **Get the Cloudinary URL**
   - From your Cloudinary dashboard, locate the uploaded video
   - Copy the URL and modify it to include the optimization parameters
   - Replace the original URL with: `https://res.cloudinary.com/dik2mqn3b/video/upload/q_auto:best,f_auto/YOUR_VIDEO_ID.mp4`

3. **Update the Component**
   - Open `src/components/home/AboutGuide.tsx` (or the relevant component)
   - Locate the current video implementation:

```typescript
// Preload the video as soon as the component mounts
useEffect(() => {
  const videoPreload = document.createElement('link');
  videoPreload.rel = 'preload';
  videoPreload.href = 'https://res.cloudinary.com/dik2mqn3b/video/upload/q_auto:best,f_auto/scene_video_rozuws.mp4';
  videoPreload.as = 'video';
  document.head.appendChild(videoPreload);
  
  // ... rest of the code
}, []);

// ... further down in the component
<video
  ref={videoRef}
  className="w-full h-full object-cover"
  autoPlay={isInView}
  muted
  loop
  playsInline
  preload="auto"
>
  <source 
    src="https://res.cloudinary.com/dik2mqn3b/video/upload/q_auto:best,f_auto/scene_video_rozuws.mp4" 
    type="video/mp4"
  />
</video>
```

4. **Replace the URL in both locations**
   - Update the URL in the `useEffect` hook (preload link)
   - Update the URL in the `<source>` element

## Advanced Optimization

For advanced optimization, consider these additional Cloudinary transformations:

1. **Crop and Resize**
   - `c_fill,w_1280,h_720` - Crop and resize to specific dimensions

2. **Quality Control**
   - `q_auto:good` - Good balance between quality and size
   - `q_auto:eco` - More aggressive compression, smaller file size
   - `q_auto:low` - Lowest quality, smallest file size

3. **Start Offset**
   - `so_0` - Start at 0 seconds
   - `so_5` - Start at 5 seconds into the video

Example with advanced parameters:
```
https://res.cloudinary.com/dik2mqn3b/video/upload/q_auto:good,f_auto,c_fill,w_1280,h_720,so_2/scene_video_rozuws.mp4
```

## Performance Best Practices

1. **Keep videos short** - 30-60 seconds is ideal for background videos
2. **Use the IntersectionObserver** - Only play videos when they're in viewport (already implemented)
3. **Always mute background videos** - Muted videos can autoplay without user interaction
4. **Preload videos** - Use the preload attribute appropriately
5. **Consider mobile users** - Provide different resolutions for different devices if needed

## Troubleshooting

If your video isn't loading correctly:

1. Check that the Cloudinary URL is correct
2. Verify that you've updated both the preload link and the source element
3. Ensure the video is publicly accessible in your Cloudinary account
4. Check browser console for any errors related to video loading 