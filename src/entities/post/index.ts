import {
  createPostAction,
  likePostAction,
  unlikePostAction,
  deleteAction,
} from './actions';
import { getPosts } from './data';
import { postSchema } from './schemas';
import { type FullPost } from './types';
import { ActionsMenu } from './ui/actions-menu';
import { MediaList } from './ui/media-list';
import { Social } from './ui/social/social';
import { VideoItem } from './ui/video-item';

export {
  FullPost,
  ActionsMenu,
  MediaList,
  Social,
  VideoItem,
  postSchema as createSchema,
  getPosts,
  createPostAction,
  likePostAction,
  unlikePostAction,
  deleteAction,
};
