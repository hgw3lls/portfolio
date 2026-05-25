# Works Config

Project records live in `content.json` under the top-level `projects` array. Each item in that array renders as one work in the Works list and detail frame.

Use the `media` array on a project to control what appears in the work detail media frame. A media item can be a video, image, audio file, document, or external link.

## Project Media Shape

```json
{
  "id": "project-id",
  "title": "PROJECT TITLE",
  "pdf": "docs/project-documentation.pdf",
  "media": [
    {
      "type": "video",
      "title": "Video title",
      "url": "https://vimeo.com/123456789",
      "caption": "Optional caption.",
      "fileName": ""
    }
  ]
}
```

## Add A Video

Set `type` to `video`. The site will embed YouTube, youtu.be, and Vimeo links automatically. Other video URLs render as an HTML video player.

```json
"media": [
  {
    "type": "video",
    "title": "Installation excerpt",
    "url": "https://vimeo.com/506931329",
    "caption": "Single-channel documentation excerpt.",
    "fileName": ""
  }
]
```

Supported video URL examples:

```json
"url": "https://vimeo.com/506931329"
```

```json
"url": "https://www.youtube.com/watch?v=VIDEO_ID"
```

```json
"url": "media/project-excerpt.mp4"
```

## Add An Image

Set `type` to `image`. The site will render the URL as an image in the media frame.

```json
"media": [
  {
    "type": "image",
    "title": "Installation view",
    "url": "images/project-installation-view.jpg",
    "caption": "Gallery installation view.",
    "fileName": ""
  }
]
```

External image URLs also work:

```json
"url": "https://example.com/project-image.jpg"
```

## Add Multiple Media Items

Add more objects to the same `media` array. They render in order.

```json
"media": [
  {
    "type": "video",
    "title": "Project video",
    "url": "https://vimeo.com/506931329",
    "caption": "",
    "fileName": ""
  },
  {
    "type": "image",
    "title": "Project still",
    "url": "images/project-still.jpg",
    "caption": "",
    "fileName": ""
  }
]
```

## Media Types

- `video`: embeds YouTube/Vimeo links or plays a direct video file.
- `image`: displays an image.
- `audio`: renders an audio player.
- `document`: renders an open/download link.
- `link`: renders an external link.

## Notes

- Keep `content.json` valid JSON: no comments, no trailing commas.
- Local media paths should be relative to the deployed site root, for example `images/work.jpg` or `media/work.mp4`.
- Project PDFs use the separate `pdf` field. Media items use the `media` array.
- If `media` is empty or missing, the detail frame falls back to the project's `embed` text.
