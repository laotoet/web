// FBAIO API Configuration
export interface FBAIOApiParams {
  [key: string]: string | boolean | number;
}

export interface FBAIOApiDefinition {
  name: string;
  url: string;
  method: 'POST';
  body: {
    id: string;
    apiname: string;
    apiparams: FBAIOApiParams;
  };
  description?: string;
}

export const FBAIO_BASE_URL = 'https://api.fbaio.xyz/call';

export const fbaioApis: FBAIOApiDefinition[] = [
  {
    name: 'Get Facebook Video Info',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_video_info',
      apiparams: { url: '' },
    },
    description: 'Fetches Facebook video information. Set apiparams.url to the video URL.',
  },
  {
    name: 'Get List of Facebook Hidden Albums',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_hidden_albums',
      apiparams: { url: '' },
    },
    description: 'Fetches a list of hidden Facebook albums. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get List of Facebook Album Media',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_album_media',
      apiparams: { album_id: '', cursor: '' },
    },
    description: 'Fetches media from a Facebook album. Set apiparams.album_id to the album ID and cursor for pagination.',
  },
  {
    name: 'Get List of Facebook Albums',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_albums',
      apiparams: { url: '', cursor: '' },
    },
    description: 'Fetches a list of Facebook albums. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get List of Facebook Comment Reply',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_comment_reply',
      apiparams: { comment_id: '', expansion_token: '', cursor: '' },
    },
    description: 'Fetches replies to a Facebook comment. Set apiparams.comment_id and expansion_token.',
  },
  {
    name: 'Get List of Facebook Pages',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_pages_other',
      apiparams: { url: '', cursor: '' },
    },
    description: 'Fetches a list of Facebook pages. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get List of Facebook Comments',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_comment',
      apiparams: { url: '', type: 'RECENT_ACTIVITY_INTENT_V1', cursor: '' },
    },
    description: 'Fetches comments from a Facebook post. Set apiparams.url to the post URL.',
  },
  {
    name: 'Get List of Facebook Groups',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_groups_other',
      apiparams: { url: '', cursor: '' },
    },
    description: 'Fetches a list of Facebook groups. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get List of Facebook Mediaset',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_mediaset',
      apiparams: { mediaset_token: '', cursor: '' },
    },
    description: 'Fetches media from a Facebook mediaset. Set apiparams.mediaset_token.',
  },
  {
    name: 'Get Facebook Post Info',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_post_info',
      apiparams: { url: '' },
    },
    description: 'Fetches information about a Facebook post. Set apiparams.url to the post URL.',
  },
  {
    name: 'Get List of Facebook User Reels',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_user_reels',
      apiparams: { url: '', cursor: '' },
    },
    description: 'Fetches user reels from Facebook. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get List of Facebook User Photos',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_user_photos',
      apiparams: { url: '', type: '5', cursor: '' },
    },
    description: 'Fetches user photos from Facebook. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Add Facebook Friend',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'add_fb_friend',
      apiparams: { targetUid: '' },
    },
    description: 'Adds a Facebook friend. Set apiparams.targetUid to the user ID.',
  },
  {
    name: 'Remove Facebook Friend',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'remove_fb_friend',
      apiparams: { targetUid: '' },
    },
    description: 'Removes a Facebook friend. Set apiparams.targetUid to the user ID.',
  },
  {
    name: 'Poke Facebook Friend',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'poke_fb_friend',
      apiparams: { targetUid: '' },
    },
    description: 'Pokes a Facebook friend. Set apiparams.targetUid to the user ID.',
  },
  {
    name: 'Get List of All Facebook Friends',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_all_friend',
      apiparams: {},
    },
    description: 'Fetches a list of all Facebook friends.',
  },
  {
    name: 'Get Facebook Entity Info',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_entity_info',
      apiparams: { url: '', raw: '' },
    },
    description: 'Fetches entity information from Facebook. Set apiparams.url and raw flag.',
  },
  {
    name: 'Get Facebook User Info',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_user_info',
      apiparams: { url: '' },
    },
    description: 'Fetches user information from Facebook. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get Facebook UID',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_uid',
      apiparams: { url: '' },
    },
    description: 'Gets Facebook user ID from profile URL. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get Facebook Post ID',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_post_id',
      apiparams: { url: '' },
    },
    description: 'Gets Facebook post ID from post URL. Set apiparams.url to the post URL.',
  },
  {
    name: 'Get Facebook Video ID',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_video_id',
      apiparams: { url: '' },
    },
    description: 'Gets Facebook video ID from video URL. Set apiparams.url to the video URL.',
  },
  {
    name: 'Call Facebook GraphQL',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'call_fb_graphql',
      apiparams: { doc_id: '', variables: '' },
    },
    description: 'Makes a GraphQL call to Facebook. Set apiparams.doc_id and variables.',
  },
  {
    name: 'Get List of Facebook Highlights',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_list_fb_highlights',
      apiparams: { url: '', cursor: '' },
    },
    description: 'Fetches Facebook highlights. Set apiparams.url to the profile URL.',
  },
  {
    name: 'Get Facebook Highlight Info',
    url: FBAIO_BASE_URL,
    method: 'POST',
    body: {
      id: 'YOUR_CLIENT_ID',
      apiname: 'get_fb_highlight_info',
      apiparams: { url: '' },
    },
    description: 'Fetches information about a Facebook highlight. Set apiparams.url to the highlight URL.',
  },
];

export default fbaioApis;