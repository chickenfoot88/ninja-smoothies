<template>
  <div class="index container">
    <transition-group name="fade-out" tag="div">
      <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card-content">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">{{ smoothie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in smoothie.ingredients" :key="index">
              <div class="chip">{{ ing }}</div>
            </li>
          </ul>
        </div>
        <router-link
          :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug }, query: { smoothie_id: smoothie.id } }"
          class="btn-floating btn-large halfway-fab pink"
          >
          <i class="material-icons edit">edit</i>
        </router-link>
      </div>
    </transition-group>
  </div>
</template>
<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data() {
    return {
      smoothies: [],
    }
  },
  methods: {
    async deleteSmoothie(id) {
      try {
        await db.collection('smoothies').doc(id).delete()
        this.smoothies = this.smoothies.filter((smoothie) => smoothie.id !== id)
      } catch (error) {
        console.error(
          `Can't delete smoothie. An error has occured. Error: ${error}`
        )
      }
    },
    async getSmothies() {
      try {
        const snapshot = await db.collection('smoothies').get()
        snapshot.forEach((doc) => {
          let smoothie = doc.data()
          smoothie.id = doc.id
          this.smoothies.push(smoothie)
        })
      } catch (error) {
        console.error(
          `Can't get smoothies. An error has occured. Error: ${error}`
        )
      }
    },
  },
  created() {
    this.getSmothies()
  },
}
</script>
<style>
.index > div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  padding-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaaaaa;
  font-size: 1.4em;
}

.fade-out-leave-active {
  transition: opacity .4s ease-out 0.5s;
}

.fade-out-leave-to {
  opacity: 0;
}
</style>
