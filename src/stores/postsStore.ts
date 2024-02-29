/**
 * stores/messagesStore.ts
 */

import { defineStore } from "pinia";
import api from "@/api";

interface Post {
  id: number;
  content: string;
  reactions: Reaction[];
}

interface PostCollection {
  data: Post[];
  links: { next: string | null };
  meta: {};
}

interface Reaction {
  type: number;
  user: object;
}

export const usePostsStore = defineStore("posts", {
  state: (): {
    posts: PostCollection | null;
  } => ({
    posts: null,
  }),
  getters: {},
  actions: {
    async get(link: null | string) {
      try {
        const { data } = link ? await api.get(link) : await api.get("posts");

        if (this.posts && link) {
          this.posts.data = [...this.posts.data, ...data.data];
          this.posts.links = data.links;
          this.posts.meta = data.meta;
        } else {
          this.posts = data;
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async create(contentData: string) {
      try {
        const { data } = await api.post(`posts`, { content: contentData });
        if (this.posts) {
          this.posts.data = [data, ...this.posts.data];
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getById(id: number) {
      try {
        const { data } = await api.get(`posts/${id}`);
        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async update(post: Post, contentData: string) {
      try {
        const { data } = await api.put(`posts/${post.id}`, {
          content: contentData,
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async delete(post: Post) {
      try {
        const { data } = await api.delete(`posts/${post.id}`);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getPostComments(post: Post) {
      try {
        const { data } = await api.get(`posts`, { content: contentData });
        if (this.posts) {
          this.posts.data = [data, ...this.posts.data];
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async getCommentReplies(comment: object) {
      try {
        const { data } = await api.get(`posts`, { content: contentData });
        if (this.posts) {
          this.posts.data = [data, ...this.posts.data];
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
