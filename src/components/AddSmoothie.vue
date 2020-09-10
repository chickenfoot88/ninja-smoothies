<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-show="ingredients.length">
        <p>Ingredients: {{ ingredients.length }}/5</p>
        <span v-for="(ing, index) in ingredients" :key="index" class="chip">
          {{ ing }}
          <i class="close material-icons" @click="deleteIngredient(ing)">close</i>
        </span>
      </div>
      <div class="field add-ingredient" v-show="ingredients.length < maxIngredientsAmount">
        <label for="add-ingredient">Ad an ingredient:</label>
        <input
          v-model="another"
          placeholder="Type an ingredient name and press Tab"
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          @keydown.enter.prevent
        />
      </div>
      <div class="field center-align">
        <p v-show="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddSmoothie',
  data() {
    return {
      maxIngredientsAmount: 5,
      title: '',
      another: '',
      ingredients: [],
      feedback: ''
    }
  },
  methods: {
    async addSmoothie() {
      if (this.title) {
        this.feedback = ''
        try {
          const smoothieId = await db.collection('smoothies').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: slugify(this.title, {
              replacement: '-',
              remove: /[$*_+~.()'"!\-:@]/g,
              lower: true
            }),
          })
          console.log(smoothieId);
          this.$router.push({ name: 'Index' })
        } catch (error) {
          console.error(`Can't add smoothie. Error: ${error}`);
        }
      } else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another)
        this.another = ''
        this.feedback = ''
      } else {
        this.feedback = 'You must enter a vule to add an ingredient'
      }
    },
    deleteIngredient(ingName) {
      this.ingredients = this.ingredients.filter((ing) => ing !== ingName)
    },
  },
}
</script>
<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.add-smoothie h2 {
  font-size: 2em;
  margin: 30px auto;
}

.add-smoothie .field {
  margin: 20px auto;
}
</style>
