// Demo data for showcasing FBAIO API integration
export const demoUserData = [
  {
    uid: "100001234567890",
    name: "John Doe",
    full_name: "John Doe",
    avatar: "https://via.placeholder.com/150/0000FF/808080?text=JD",
    url: "https://facebook.com/john.doe",
    profile_pic: "https://via.placeholder.com/150/0000FF/808080?text=JD"
  },
  {
    uid: "100001234567891",
    name: "Jane Smith",
    full_name: "Jane Smith",
    avatar: "https://via.placeholder.com/150/FF0000/FFFFFF?text=JS",
    url: "https://facebook.com/jane.smith",
    profile_pic: "https://via.placeholder.com/150/FF0000/FFFFFF?text=JS"
  },
  {
    uid: "100001234567892",
    name: "Mike Johnson",
    full_name: "Mike Johnson",
    avatar: "https://via.placeholder.com/150/00FF00/000000?text=MJ",
    url: "https://facebook.com/mike.johnson",
    profile_pic: "https://via.placeholder.com/150/00FF00/000000?text=MJ"
  }
];

export const demoPostData = [
  {
    id: "post_123456789",
    url: "https://facebook.com/posts/123456789",
    text: "This is a sample Facebook post with image",
    timestamp: 1704067200,
    author: {
      uid: "100001234567890",
      name: "John Doe",
      avatar: "https://via.placeholder.com/150/0000FF/808080?text=JD"
    },
    media: [
      {
        id: "media_001",
        url: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Sample+Image",
        type: "image",
        width: 400,
        height: 300
      }
    ],
    likes_count: 42,
    comments_count: 15,
    shares_count: 3
  },
  {
    id: "post_123456790",
    url: "https://facebook.com/posts/123456790",
    text: "Another post with video content",
    timestamp: 1704080400,
    author: {
      uid: "100001234567891",
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/150/FF0000/FFFFFF?text=JS"
    },
    media: [
      {
        id: "media_002",
        url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        type: "video",
        width: 1280,
        height: 720
      }
    ],
    likes_count: 87,
    comments_count: 23,
    shares_count: 12
  }
];

export const demoAlbumData = [
  {
    album_id: "album_001",
    name: "Vacation Photos",
    description: "Photos from our amazing vacation",
    cover_photo: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Vacation",
    media_count: 45,
    created_time: 1703980800,
    owner: {
      uid: "100001234567890",
      name: "John Doe"
    }
  },
  {
    album_id: "album_002", 
    name: "Wedding Pictures",
    description: "Beautiful moments from the wedding day",
    cover_photo: "https://via.placeholder.com/300x200/FF6B9D/FFFFFF?text=Wedding",
    media_count: 128,
    created_time: 1703808000,
    owner: {
      uid: "100001234567891",
      name: "Jane Smith"
    }
  }
];

export const demoApiResponse = {
  success: true,
  status: "OK",
  result: demoUserData,
  pagination: {
    cursor: "next_page_token_123",
    has_next: true,
    total_count: 150
  },
  metadata: {
    api_version: "v1.0",
    request_id: "req_123456789",
    execution_time: 0.245
  }
};
