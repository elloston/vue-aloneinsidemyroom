/**
 * stores/postsStore.ts
 */

import { defineStore } from "pinia";
import api from "@/api";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: null as PaginatedResponse<Post> | null,
  }),
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
    async getById(id) {
      try {
        const { data } = await api.get(`posts/${id}`);
        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async update(id: number, contentData: string) {
      try {
        const { data } = await api.put(`posts/${id}`, {
          content: contentData,
        });
        console.log(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async delete(post: Post) {
      try {
        const { data } = await api.delete(`posts/${post.id}`);
        console.log(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
