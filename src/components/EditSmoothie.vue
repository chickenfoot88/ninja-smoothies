<template>
  <div v-if="Object.keys(smoothie).length" class="edit-smoothie container">
    <h2>Edit "{{ smoothie.title }}" smoothie</h2>
    <form @submit.prevent="updateSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div v-show="smoothie.ingredients.length">
        <p>Ingredients: {{ smoothie.ingredients.length }}/5</p>
        <span v-for="(ing, index) in smoothie.ingredients" :key="index" class="chip">
          {{ ing }}
          <i class="close material-icons" @click="deleteIngredient(ing)">close</i>
        </span>
      </div>
      <div class="field add-ingredient" v-show="smoothie.ingredients.length < maxIngredientsAmount">
        <label for="add-ingredient">Ad an ingredient:</label>
        <input
          v-model.trim="another"
          placeholder="Type an ingredient name and press Tab"
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          @keydown.enter.prevent
        />
      </div>
      <div class="field center-align">
        <p v-show="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: "EditSmoothie",
  props: {
    smoothie_id: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      maxIngredientsAmount: 5,
      another: '',
      smoothie: {},
      feedback: ''
    }
  },
  created() {
    this.getSmoothie()
  },
  methods: {
    async getSmoothie() {
      let ref = db.collection('smoothies').doc(this.smoothie_id)
      // let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
      try {
        const snapshot = await ref.get()
        this.smoothie = snapshot.data()
        this.smoothie.id = snapshot.id
      } catch(error) {
        console.error(error);
      }
    },
    async updateSmoothie() {
      if (this.smoothie.title) {
        this.feedback = ''
        try {
          await db.collection('smoothies').doc(this.smoothie.id).set({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: slugify(this.smoothie.title, {
              replacement: '-',
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true
            }),
          })
          this.$router.push({ name: 'Index' })
        } catch (error) {
          console.error(`Can't update smoothie. Error: ${error}`);
        }
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIngredient() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.another = ''
        this.feedback = ''
      } else {
        this.feedback = 'You must enter a vule to add an ingredient'
      }
    },
    deleteIngredient(ingName) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter((ing) => ing !== ingName)
    },
  }
}
</script>
<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-smoothie h2 {
  font-size: 2em;
  margin: 30px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
}
</style>
