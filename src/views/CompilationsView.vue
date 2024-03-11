<script setup lang="ts">
import { ref } from "vue";

const compilations = ref([
  {
    user_id: "",
    original_title: "Brain on Fire",
    localized_title: "Разум в огне",
    year: "2016",
    genre_id: "", // Драмма
    country_id: "", // Канада, Ирландия
    regiser_id: "", // Джерард Барретт
    description: `Сюзанна была обычной юной девушкой, у неё был парень, перспективная работа и достаточно друзей. Но однажды с ней начало происходить нечто странное. Она стала впадать в панику без явных причин, терять сознание, ей стали видеться несуществующие вещи. Сюзанна отправилась в больницу, прошла ряд обследований и врачи поставили ей неутешительный диагноз. Молодая девушка испугалась сложившейся ситуации, но благодаря активной поддержке близких и в частности её парня, она нашла в себе силы не падать духом и продолжать лечение.`,
  },
  {
    user_id: "",
    original_title: "",
    localized_title: "Игры разума",
    year: "",
    genre_id: "", // Драмма
    country_id: "", // Канада, Ирландия
    regiser_id: "", // Джерард Барретт
    description: "",
  },
]);
</script>

<template>
  <div>
    <v-container>
      <v-row class="py-5 justify-center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card
            class="pa-5 pa-md-8 mb-3"
            v-for="(compilation, index) in compilations"
            :key="index"
          >
            <h2 class="text-h4 font-weight-medium mb-4">
              {{
                `${compilation.original_title} (${compilation.localized_title})`
              }}
            </h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
